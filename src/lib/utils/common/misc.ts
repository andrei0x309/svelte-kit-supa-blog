export const shuffleFY = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }


export const getDiffFromNow = (
  dateString: string, scale: 'days' | 'seconds' | 'hours' | 'minutes' = 'days'
): number => {
  let scaleDiff
  if (scale === 'days') {
    scaleDiff = 1000 * 60 * 60 * 24
  } else if (scale === 'seconds') {
    scaleDiff = 1000
  } else if (scale === 'hours') {
    scaleDiff = 1000 * 60 * 60
  } else if (scale === 'minutes') {
    scaleDiff = 1000 * 60
  } else {
    throw new Error('Invalid scale provided')
  }
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.abs(now.getTime() - date.getTime())
 const diffInScale = Math.floor(diff / scaleDiff)
 return diffInScale
}