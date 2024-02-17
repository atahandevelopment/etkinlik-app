import api from "@/interceptor";

export const GetBidReq = async (fullname, phone, email, content, company_name, information_channel, is_active, is_bid) =>{
    let url = '/information-request';

    if(fullname) url += '?fullname=' + fullname;
    if(phone) url += '&phone=' + phone;
    if(email) url += '&email=' + email;
    if(company_name) url += '&company_name=' + company_name;
    if(information_channel) url += '&information_channel=' + information_channel;
    if(content) url += '&content=' + content;
    if(is_active) url += '&is_active=' + is_active;
    if(is_bid) url += '&is_bid=' + is_bid;

    return await api.get(url);
}

export const UpdateBidReq = async (id, data) => {
    return await api.put(`/information-request/${id}`, data)
}


export const DeleteBidReq = async (id) => {
    return await api.delete(`/information-request/${id}`)
}