import axiosClient from "./axiosClient";

const url = "/posts";

export const postApi = {
  getAll(params) {
    return axiosClient.get(url, { params });
  },

  getBySlug(slug) {
    return axiosClient.get(`${url}/${slug}`);
  },

  create(body) {
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update(id, body) {
    return axiosClient.put(`${url}/${id}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  remove(id) {
    return axiosClient.delete(`${url}/${id}`);
  },
};
