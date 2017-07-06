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
      $liBdy.append($liBdyText);

      // const $liBdyTag = $('<div>').text(beer.tagline);
      // $liBdy.append($liBdyTag);
      // const $liBdyDisc = $('<div>').text(beer.description);
      // $liBdy.append($liBdyDisc);

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
              description: item.description
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
    var ABV_gt = $('#searchABV_gt').val();
    var ABV_lt = $('#searchABV_lt').val();
    var IBU_gt = $('#searchIBU_gt').val();
    var IBU_lt = $('#searchIBU_lt').val();
    var EBC_gt = $('#searchEBC_gt').val();
    var EBC_lt = $('#searchEBC_lt').val();
    var yeast = $('#searchYeast').val();
    var hops = $('#searchHops').val();
    var malt = $('#searchMalt').val();

    console.log('name: ',name);
    console.log('id: ',id);

    if (id) {
      searchVar.push('ids=' + id);
    } if (name) {
      searchVar.push('beer_name=' + name);
    } if (ABV_gt) {
      searchVar.push('abv_gt=' + abv_gt);
    } if (ABV_lt) {
      searchVar.push('abv_lt=' + abv_lt);
    } if (IBU_gt) {
      searchVar.push('ibu_gt=' + ibu_gt);
    } if (IBU_lt) {
      searchVar.push('ibu_lt=' + ibu_lt);
    } if (EBC_gt) {
      searchVar.push('ebc_gt=' + ebc_gt);
    } if (EBC_lt) {
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
