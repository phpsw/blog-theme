(function() {
  var module = {
    init: function() {
      module.post();
      module.list();
    },

    post: function() {
      var $post = $('.post:not(.post-item)');

      if ($post.length && !$('.metabar-item--shares').length) {
        var $side   = $('.metabar__side--right'),
            $social = $side.find('.metabar-item--social'),
            $shares = $('<span/>', {'class': 'metabar-item metabar-item--shares'}),
            url = window.location,
            q = 'site:twitter.com "' + url + '"';

        $shares.prependTo($side);

        $.ajax({
          url: 'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + q,
          dataType: 'jsonp'
        })
          .done(function(data) {
            var usernames = $
              .map(data.responseData.results, function(result) {
                return result.url.replace(/https:\/\/twitter.com\/([^\/]+).*/, '$1');
              })
              .reduce(function(p, c) {
                if (p.indexOf(c) < 0) p.push(c);
                return p;
              }, [])
            ;

            $.each(usernames, function (i, username) {
              $shares.append(
                $('<a/>', {href: 'https://twitter.com/' + username, class: 'metabar-item--post-meta__author'}).append(
                  $('<img/>', {src: 'http://avatars.io/twitter/' + username})
                )
              )
            })
          })
        ;
      }
    },

    list: function() {
    }
  };

  $(document).on('ready pjax:end', module.init);
}());
