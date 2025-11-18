export const getServiceId = (): string => {
  const serviceId = process.env.AUTHLETE_SERVICE_ID || "";
  if (!serviceId) {
    console.warn("AUTHLETE_SERVICE_ID not set in environment");
    return "";
  }
  return serviceId;
};
