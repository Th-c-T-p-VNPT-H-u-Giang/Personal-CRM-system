import createApiClient from "./api.services";

class unitsService {
  constructor(baseUrl = "/api/units") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post(`/`, data)).data;
  }
  async findAll() {
    return (await this.api.get("/")).data;
  }
  async findAllUnitsOfADep(depId) {
    return (await this.api.get(`/dep/${depId}`)).data;
  }
  async update(id, data) {
    return (await this.api.post(`/${id}`, data)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async deleteOne(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.post(`/${id}`, data)).data;
  }
}

export default new unitsService();
