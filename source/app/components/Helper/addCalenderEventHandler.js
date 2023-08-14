import * as AddCalendarEvent from 'react-native-add-calendar-event';

export const addCalenderEvent = async (data) => {
    return await addToCalendar(data);
}

const addToCalendar = (data) => {
    const eventConfig = {
        title: data && data.order_title && data.order_id ? `${data.order_title} (Order Id : ${data.order_id})` : ''  
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
        .then(eventId => {
            if (eventId) {
                console.log(eventId);
            } else {
                console.log('dismissed');
            }
        })
        .catch((error = String) => {
            console.log(error, 'error calander handler');
        });
};

