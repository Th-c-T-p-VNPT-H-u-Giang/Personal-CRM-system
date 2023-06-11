import createApiClient from "./api.service";

class CustomerEvent {
  constructor(baseUrl = "/api/customer_event") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
}

export default new CustomerEvent();
