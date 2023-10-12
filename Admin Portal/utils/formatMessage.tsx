const formatMessage = (complaint: String) => {
    const words = complaint.split(' ');
    if (words.length > 3) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return complaint;
};

export default formatMessage;