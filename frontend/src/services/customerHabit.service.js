import createApiClient from "./api.service";

class CustomerHabit {
  constructor(baseUrl = "/api/customer_habit") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
}

export default new CustomerHabit();
