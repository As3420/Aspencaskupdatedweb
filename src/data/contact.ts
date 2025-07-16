export interface ContactInfo {
  office: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  email: string;
  phone: string;
  businessHours: string;
  supportHours: string;
}

export const contactInfo: ContactInfo = {
  office: {
    address: 'Raj Bagh, Ghaziabad',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    pincode: '201005'
  },
  email: 'support@aspencask.com',
  phone: '+91 9608674820',
  businessHours: 'Mon-Fri 9AM-6PM IST',
  supportHours: 'Mon-Sat 9AM-8PM IST'
};