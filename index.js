/*jshint esversion: 6 */

// this is to initilize modals ***jam
$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
// this is to initilize modals ***jam

(function() {
  'use strict';

  // Mock data
  let beers = [];
  let beerList = [];
  let searchVar = [];
  let searchString = '';

  const renderBeers = function () {
    const $listings = $('#listings');
    $('#listings').empty();
    const $ul = $('<ul>');
      $ul.attr("class", "collapsible");
      $ul.attr("data-collapsible", "accordion");


    for (const beer of beers) {
      const $li = $('<li>');

      const $liHdr = $('<div class="collapsible-header">').text(beer.name);
      $li.append($liHdr);

      const $liBdy = $('<div class="collapsible-body">');
      const $liBdyText = $('<span>').text(beer.tagline);

      const $liRow = $("<div>").attr("class", "row");
      $liBdy.append($liRow);

      const $liCol1 = $("<div>").attr("class", "col s10");

      const tagLine = ("Tagline: " + beer.tagline);
      const $liBdyTag = $('<div>').text(tagLine);
      $liCol1.append($liBdyTag);

      const $hr = $('<hr>');
      $liCol1.append($hr);

      const disc = ("Discription: " + beer.description);
      const $liBdyDisc = $('<div>').text("Discription: ").text(disc);

      const $table = $("<table>");
      const $trow1 = $("<tr>");

      const abvText = ("ABV: " + beer.abv);
      const $abvModal1 = $("<a>").text(abvText).attr({class: "modal-close", href: "#modal1"});
      var $tr1cell1 = $("<td>");
      $tr1cell1.append($abvModal1);
      $trow1.append($tr1cell1);

      const ibuText = ("IBU: " + beer.ibu);
      const $ibuModal2 = $("<a>").text(ibuText).attr({class: "modal-close", href: "#modal2"});
      const $tr1cell2 = $("<td>");
      $tr1cell2.append($ibuModal2);
      $trow1.append($tr1cell2);

      const phText = ("PH: " + beer.ph);
      const $phModal5 = $("<a>").text(phText).attr({class: "modal-close", href: "#modal5"});
      const $tr1cell3 = $("<td>");
      $tr1cell3.append($phModal5);
      $trow1.append($tr1cell3);
      $table.append($trow1);

      const $trow2 = $("<tr>");

      const ebcText = ("EBC: " + beer.ebc);
      const $ebcModal3 = $("<a>").text(ebcText).attr({class: "modal-close", href: "#modal3"});
      const $tr2cell1 = $("<td>");
      $tr2cell1.append($ebcModal3);
      $trow2.append($tr2cell1);

      const srmText = ("SRM: " + beer.srm);
      const $srmModal4 = $("<a>").text(srmText).attr({class: "modal-close", href: "#modal4"});
      const $tr2cell2 = $("<td>");
      $tr2cell2.append($srmModal4);
      $trow2.append($tr2cell2);

      const $tr2cell3 = $("<td>");
      const $colorText = $("<span>").text("Color: ");
      $tr2cell3.append($colorText);
        var ebcColor = '';
        beer.ebc = Number(beer.ebc);
        if ( beer.ebc < 6) {
          ebcColor = ('colorBtn5');
        } else if ( beer.ebc < 8) {
            ebcColor = ('colorBtn7');
        } else if ( beer.ebc < 12) {
            ebcColor = ('colorBtn11');
        } else if ( beer.ebc < 16) {
            ebcColor = ('colorBtn15');
        } else if ( beer.ebc < 20) {
            ebcColor = ('colorBtn19');
        } else if ( beer.ebc < 26) {
            ebcColor = ('colorBtn25');
        } else if ( beer.ebc < 33) {
            ebcColor = ('colorBtn32');
        } else if ( beer.ebc < 39) {
            ebcColor = ('colorBtn38');
        } else if ( beer.ebc < 47) {
            ebcColor = ('colorBtn46');
        } else if ( beer.ebc < 57) {
            ebcColor = ('colorBtn56');
        } else if ( beer.ebc < 69) {
            ebcColor = ('colorBtn68');
        } else if ( beer.ebc < 79) {
            ebcColor = ('colorBtn78');
        } else if ( beer.ebc === 79) {
            ebcColor = ('colorBtn79');
        } else if ( beer.ebc > 79) {
            ebcColor = ('colorBtn79');
        }
      const $colorBtn = $("<a>").attr("class", "btn " + ebcColor);

      $tr2cell3.append($colorBtn);

      $trow2.append($tr2cell3);
      $table.append($trow2);

      const $trow3 = $("<tr>");

      const attenlevelText = ("Attenuation level: " + beer.attenuation_level);
      const $attenlevelModal6 = $("<a>").text(attenlevelText).attr({class: "modal-close", href: "#modal6"});
      const $tr3cell1 = $("<td>").attr("colspan", "2");
      $tr3cell1.append($attenlevelModal6);
      $trow3.append($tr3cell1);

      const $tr3cell3 = $("<td>");
      const $recipeBtn = $("<button>").text("Recipe").attr("beerId", beer.id);
      $tr3cell3.append($recipeBtn);
      $trow3.append($tr3cell3);

      $table.append($trow3);
      $liBdyDisc.append($table);

      $liCol1.append($liBdyDisc);
      $liRow.append($liCol1);

      const $liCol2 = $("<div>").attr("class", "col s2");
      const $liImg = $("<img>").attr({"src": beer.image_url, "height": "200px", "width": "auto", "align": "center"});
      // console.log(beer.image_url);
      $liCol2.append($liImg);
      $liRow.append($liCol2);

      $liBdy.append($liRow);

      $li.append($liBdy);

      $ul.append($li);
    }
    $listings.append($ul);
    $(document).ready(function(){
    $('.collapsible').collapsible();
  });
  };

const getBeers = function(name) {

      $('.progress').css('visibility', 'visible');

      var $xhr = $.getJSON(`https://api.punkapi.com/v2/beers?${searchVar}`);
      $xhr.done(function(data) {
          if ($xhr.status !== 200) {
              return;
          }

          console.log(data);

          beerList = data;

          const newBeers = [];
          for (const item of data) {
            // console.log(item.ingredients.hops);
            // const newHops = []
            const newItem = {
              id: item.id,
              image_url: item.image_url,
              name: item.name,
              tagline: item.tagline,
              description: item.description,
              abv: item.abv,
              ibu: item.ibu,
              ebc: item.ebc,
              attenuation_level: item.attenuation_level,
              ph: item.ph,
              srm: item.srm
              //
              // for (const item of data.ingredients) {
              //   const newHops = []
              // }
              //
            };
            newBeers.push(newItem);
          }
          beers = newBeers;
          // console.log('beers = ' + beers);
          renderBeers();
          $('.progress').css('visibility', 'hidden');
      });
      searchVar = [];
      searchString = '';
  };


  $('form').submit(function(event) {
    event.preventDefault();

    var id = $('#searchId').val();
    var name = $('#searchName').val();
    var abv_gt = $('#searchABV_gt').val();
    var abv_lt = $('#searchABV_lt').val();
    var ibu_gt = $('#searchIBU_gt').val();
    var ibu_lt = $('#searchIBU_lt').val();
    var ebc_gt = $('#searchEBC_gt').val();
    var ebc_lt = $('#searchEBC_lt').val();
    var yeast = $('#searchYeast').val();
    var hops = $('#searchHops').val();
    var malt = $('#searchMalt').val();

    // console.log('name: ',name);
    // console.log('id: ',id);

    if (id) {
      searchVar.push('ids=' + id);
    } if (name) {
      searchVar.push('beer_name=' + name);
    } if (abv_gt) {
      searchVar.push('abv_gt=' + abv_gt);
    } if (abv_lt) {
      searchVar.push('abv_lt=' + abv_lt);
    } if (ibu_gt) {
      searchVar.push('ibu_gt=' + ibu_gt);
    } if (ibu_lt) {
      searchVar.push('ibu_lt=' + ibu_lt);
    } if (ebc_gt) {
      searchVar.push('ebc_gt=' + ebc_gt);
    } if (ebc_lt) {
      searchVar.push('ebc_lt=' + ebc_lt);
    } if (yeast) {
      searchVar.push('yeast=' + yeast);
    } if (hops) {
      searchVar.push('hops=' + hops);
    } if (malt) {
      searchVar.push('malt=' + malt);
    }

    searchString = searchVar.join('&');

    // console.log('searchVar: ' + searchVar);
    // console.log('searchString: ' + searchString);

    getBeers(name);
  });

})();
