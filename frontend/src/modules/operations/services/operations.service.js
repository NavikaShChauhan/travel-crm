/**
 * operations.service.js
 * -----------------------------------------------------------------------
 * Operations domain service maintaining handed-over bookings from Sales.
 */

const operationsHandoverStore = [];

export const registerConfirmedBooking = (bookingData) => {
  operationsHandoverStore.push({
    ...bookingData,
    handoverDate: new Date().toISOString(),
    opsStatus: 'Pending Allocation',
  });
  return { success: true, bookingId: bookingData.bookingId };
};

export const getHandedOverBookings = () => operationsHandoverStore;

export const getAll = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return operationsHandoverStore;
};
