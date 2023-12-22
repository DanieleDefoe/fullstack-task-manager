import moment from 'moment/moment';

export const formatDate = (date: string) => {
  return moment(date).format('DD/MM/YYYY');
};
