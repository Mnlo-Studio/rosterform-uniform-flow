
export const validateOrderForm = (customerInfo: {
  teamName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}) => {
  if (!customerInfo.teamName?.trim()) {
    return 'Please enter a team name';
  }
  if (!customerInfo.contactName?.trim()) {
    return 'Please enter a contact name';
  }
  if (!customerInfo.email?.trim()) {
    return 'Please enter an email address';
  }
  if (!customerInfo.phone?.trim()) {
    return 'Please enter a phone number';
  }
  if (!customerInfo.address?.trim()) {
    return 'Please enter a shipping address';
  }
  if (!customerInfo.city?.trim()) {
    return 'Please enter a city';
  }
  if (!customerInfo.state?.trim()) {
    return 'Please enter a state';
  }
  if (!customerInfo.zipCode?.trim()) {
    return 'Please enter a zip code';
  }
  return null;
};
