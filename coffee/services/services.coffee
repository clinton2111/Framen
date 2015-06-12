angular.module 'framen'
.factory 'mainServices', ['$http', '$q', 'API', ($http, $q, API)->
  return(

    sendEmail: (emailData)->
      q = $q.defer()
      $http
        url: API.url + 'mailer.php'
        data: emailData
        method: 'post'
      .then (data)->
        q.resolve data
      , (error)->
        q.reject error
      q.promise
  )

]