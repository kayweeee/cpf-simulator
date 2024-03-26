export function piepercentage(listofparams) {

  listofparams.forEach((id, percentage) => {
    var degree = percentage * 360;
    console.log(degree);
    var el = document.getElementById(id);
    console.log(el);
  }
  )
}

//   .mask.full-mask,
//   .fill {
//     /*
//       For a value of 90%
//       0.9 * 360  / 2
//     */
//     transform: rotate(180deg); //half
//   }
//   .fill.shim {
//     /*
//       For a value of 90%
//       0.9 * 360
//     */
//     transform: rotate(360deg); //full
//   }