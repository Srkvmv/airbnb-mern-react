import http from "../http-common";

class ListingDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  createReservation(data) {
    return http.post("/reservation", data);
  }
}

export default new ListingDataService();
