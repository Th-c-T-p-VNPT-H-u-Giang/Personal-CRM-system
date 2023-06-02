import createApiClient from "./api.services";

class centerService {
  constructor(baseUrl = "center_VNPTHGs") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post(`/`, data)).data;
  }
  async findAll() {
    return (await this.api.get("/")).data;
  }
  // async themDN(data){
  //     return (await this.api.post(`/`,data)).data;
  // };
  // async chinhsuaDN(data){
  //     return (await this.api.put(`/`,data)).data;
  // };
  // async thongkeDN(nam){
  //     return (await this.api.get(`/thongke/${nam}`)).data;
  // };
}

export default new centerService();
