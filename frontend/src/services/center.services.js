import createApiClient from "./api.services";

class centerService {
  constructor(baseUrl = "/api/center_VNPTHGs") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post(`/`, data)).data;
  }
  async findAll() {
    return (await this.api.get("/")).data;
  }
  async findOne(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
}

export default new centerService();
