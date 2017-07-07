(function() {
  'use strict';

  // Mock data
  let beers = [];
  let beerList = [];
  let searchVar = [];
  let searchString = '';

  // Add renderMovies function here:
  const renderBeers = function () {
    const $listings = $('#listings');
    $('#listings').empty();
    const $ul = $('<ul>');
      $ul.attr("class", "collapsible");
      $ul.attr("data-collapsible", "accordion")


    for (const beer of beers) {
      const $li = $('<li>');    //.text(beer.name);

      const $liHdr = $('<div class="collapsible-header">').text(beer.name);
      $li.append($liHdr);

      const $liBdy = $('<div class="collapsible-body">');
      const $liBdyText = $('<span>').text(beer.tagline);
      // $liBdy.append($liBdyText);

      const $liRow = $("<div>").attr("class", "row");
      $liBdy.append($liRow);

      const $liRow1 = $("<div>").attr("class", "row");

      const $liCol1 = $("<div>").attr("class", "col s10");

      const tagLine = ("Tagline: " + beer.tagline);
      const $liBdyTag = $('<div>').text(tagLine);
      $liCol1.append($liBdyTag);

      const $hr = $('<hr>');
      $liCol1.append($hr);

      const disc = ("Discription: " + beer.description);
      const $liBdyDisc = $('<div>').text("Discription: ").text(disc);
      $liCol1.append($liBdyDisc);
      $liRow1.append($liCol1);

      const $liCol2 = $("<div>").attr("class", "col s2");
      const $liImg = $("<img>").attr({"src": beer.image_url, "height": "125px", "width": "auto", "align": "center"});
      console.log(beer.image_url);
      $liCol2.append($liImg);
      $liRow1.append($liCol2);

      const $liRow2 = $("<div>").attr("class", "row");

      const $liCol12 = $("<div>").attr("class", "col s8");
      const $table = $("<table>");
      const $trow1 = $("<tr>");

      const abvText = ("ABV: " + beer.abv);
      const $tr1cell1 = $("<td>").text(abvText);
      $trow1.append($tr1cell1);

      const ibuText = ("IBU: " + beer.ibu);
      const $tr1cell2 = $("<td>").text(ibuText);
      $trow1.append($tr1cell2);

      const phText = ("PH: " + beer.ph);
      const $tr1cell3 = $("<td>").text(phText);
      $trow1.append($tr1cell3);
      $table.append($trow1);

      const $trow2 = $("<tr>");

      const ebcText = ("EBC: " + beer.ebc);
      const $tr2cell1 = $("<td>").text(ebcText);
      $trow2.append($tr2cell1);

      const srmText = ("SRM: " + beer.srm);
      const $tr2cell2 = $("<td>").text(srmText);
      $trow2.append($tr2cell2);

      // const phText = ("PH: " + beer.ph);
      const $tr2cell3 = $("<td>");   //.text(phText);
      $trow2.append($tr2cell3);
      $table.append($trow2);

      const $trow3 = $("<tr>");

      const attenlevelText = ("Attenuation level: " + beer.attenuation_level);
      const $tr3cell1 = $("<td>").attr("colspan", "2").text(attenlevelText);
      $trow3.append($tr3cell1);

      $table.append($trow3);

      $liCol12.append($table);
      $liRow2.append($liCol12);
      $liRow.append($liRow1);
      $liRow.append($liRow2);
      $liBdy.append($liRow);

      $li.append($liBdy);

      $ul.append($li);
    }
    $listings.append($ul);
    $(document).ready(function(){
    $('.collapsible').collapsible();
  });
  };

  // Add getMovies function here:
const getBeers = function(name) {
      var $xhr = $.getJSON(`https://api.punkapi.com/v2/beers?${searchVar}`)
      $xhr.done(function(data) {
          if ($xhr.status !== 200) {
              return;
          }
          console.log(data);
          // beers = data;
          beerList = data;

          const newBeers = [];
          for (const item of data) {
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
            };
            newBeers.push(newItem);
          }
          beers = newBeers;
          console.log('beers = ' + beers);
          renderBeers();
      });
      searchVar = [];
      searchString = '';
  };

  // Add submit event listener here:
  $('form').submit(function(event) {
    event.preventDefault();
    // alert ('Submitted');
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

    console.log('name: ',name);
    console.log('id: ',id);

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

    console.log('searchVar: ' + searchVar);
    console.log('searchString: ' + searchString);

    getBeers(name);
  });

})();
