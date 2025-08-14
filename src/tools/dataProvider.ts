import { fetchUtils, DataProvider, GetManyParams } from "react-admin";
import baseApiUrl from "./url_base";

const apiUrl = baseApiUrl; // Your API base URL

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  return fetchUtils.fetchJson(url, options);
};

const dataProvider: DataProvider = {
  // Fetch a list of resources with pagination
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { filter } = params;

    // Convert filter object into query params
    const filterParams = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        filterParams.append(key, value);
      }
    });

    const url = `${apiUrl}/${resource}?page=${page - 1}&size=${perPage}&${filterParams.toString()}`;

    return httpClient(url)
      .then(({ json, headers }) => {
        const contentRange = headers.get("Content-Range");
        let total = 0;

        if (contentRange) {
          const match = contentRange.match(/(\d+)-(\d+)\/(\d+)/);
          if (match) {
            total = parseInt(match[3], 10);
          }
        }

        return {
          data: json,
          total: json?.length, // fallback if no header
        };
      })
      .catch((error) => {
        console.error(`(getList) Error fetching ${resource}`, error);
        throw new Error(`Failed to fetch ${resource}: ${error?.message}`);
      });
  },

  // Get a single resource by id
  getOne: async (resource: string, params: { id: any }) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url)
      .then(({ json }) => ({ data: json }))
      .catch((error) => {
        console.error(
          `(getOne) Error fetching ${resource} ID: ${params.id}`,
          error,
        );
        throw new Error(`Failed to fetch resource: ${error?.message}`);
      });
  },

  // Create a new resource
  create: (resource: string, params: { data: any }) => {
    console.log("Creating resource with data:", params.data);
    const url = `${apiUrl}/${resource}`;
    return httpClient(url, {
      method: "POST",
      body: JSON.stringify(params.data),
    })
      .then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }))
      .catch((error) => {
        console.error("Error creating resource", error);
        throw new Error(`Failed to create resource: ${error?.message}`);
      });
  },

  // Update an existing resource
  update: (resource: string, params: { id: any; data: any }) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    })
      .then(({ json }) => ({ data: json }))
      .catch((error) => {
        console.error("Error updating resource", error);
        throw new Error(`Failed to update resource: ${error?.message}`);
      });
  },

  // Fetch related resources
  getManyReference: async (resource: string, params: any) => {
    const { target, id } = params;
    const { page, perPage } = params.pagination;
    const url = `${apiUrl}/${resource}?${target}=${id}&page=${page - 1}&size=${perPage}`;

    try {
      const { json, headers } = await httpClient(url);

      const contentRange = headers.get("Content-Range");
      let total = 0;
      if (contentRange) {
        const match = contentRange.match(/(\d+)-(\d+)\/(\d+)/);
        if (match) {
          total = parseInt(match[3], 10);
        }
      }

      return { data: json, total };
    } catch (error) {
      console.error("Error fetching related data", error);
      throw new Error(
        `Failed to fetch related data: ${error?.message || error}`,
      );
    }
  },

  // Fetch multiple resources by IDs
  getMany: async (resource: string, params: GetManyParams) => {
    const url = `${apiUrl}/${resource}?ids=${params.ids.join(",")}&page=0&size=10`;
    return httpClient(url)
      .then(({ json }) => ({ data: json }))
      .catch((error) => {
        console.error("(getMany) Error fetching resources", error);
        throw new Error(`Failed to fetch resources: ${error?.message}`);
      });
  },
};

export default dataProvider;
