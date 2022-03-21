const truncateText = (str: string, length: number) => {
  return str.split(' ').splice(0, length).join(' ')
}

export default truncateText
