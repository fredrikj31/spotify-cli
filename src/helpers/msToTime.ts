const msToTime = (ms: number) => {
  const seconds = ms / 1000;
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;

  return pad(minutes) + ":" + pad(Math.round(restSeconds));
};

function pad(n: number) {
  return ("00" + n).slice(-2);
}

export default msToTime;
