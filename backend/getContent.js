const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const images = [];
const name = [];
const prices = [];
var categories;
//forgive me for i am about to mess this even more :)
var iprices = 0;
var iimage = 0;
var iname = 0;

const websitecat = "https://www.alkoholeswiata24.pl/";

//getting categories, the site above is a mess which is why im writing tihs abomination of a code

try {
  axios(websitecat).then((response) => {
    const data = response.data;
    const $ = cheerio.load(data);
    $(".styl1", data).each((i, ul) => {
      const children = $(ul).children();
      children.each((icat, li) => {
        const children = $(li).children();
        children.each((d, a) => {
          //async await too hard so im making this abomination even more scary
          categories = $(a).attr("href");
          const websitecontent = websitecat + $(a).attr("href");
          axios(websitecontent).then((response) => {
            const data = response.data;
            const $ = cheerio.load(data);
            $(".productName", data).each((indeks, a) => {
              const children = $(a).children();
              children.each((w, span) => {
                name.push({
                  id: ++iname,
                  name: $(span).attr("title"),
                });
              });
            });
            $(".priceGross", data).each(function () {
              prices.push({ id: ++iprices, price: $(this).text() });
            });
            $(".mainImage", data).each((ind, img) => {
              const children = $(img).children();
              children.each((i, src) => {
                images.push({
                  id: ++iimage,
                  imageURL: websitecat + $(src).attr("src"),
                });
              });
            });
          });
        });
      });
    });
  });
} catch (error) {
  console.log(error, error.message); //struggle
}

//oh lord what am I even doing
const wholeData = [];
function merge() {
  [name, prices, images].forEach(
    (
      (hash) => (a) =>
        a.forEach((b) => {
          if (!hash[b.id]) {
            hash[b.id] = {};
            wholeData.push(hash[b.id]);
          }
          Object.assign(hash[b.id], b);
        })
    )(Object.create(null))
  );
}
setTimeout(merge, 10000);
//finally this abomination lives
const indexes = [];
function omg() {
  for (let i = 1; i <= iprices; i++) {
    indexes.push(i);
  }
}
setTimeout(omg, 10000);

exports.wholeData = wholeData;
exports.indexes = indexes;
