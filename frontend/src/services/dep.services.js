import createApiClient from "./api.services";

class departmentsService {
  constructor(baseUrl = "/api/departments") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post(`/`, data)).data;
  }
  async findAll() {
    return (await this.api.get("/")).data;
  }
  async findAllDepOfACenter(centerId) {
    return (await this.api.get(`/center/${centerId}`)).data;
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

export default new departmentsService();
