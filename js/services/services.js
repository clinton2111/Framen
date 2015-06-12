angular.module('framen').factory('mainServices', [
  '$http', '$q', 'API', function($http, $q, API) {
    return {
      sendEmail: function(emailData) {
        var q;
        q = $q.defer();
        $http({
          url: API.url + 'mailer.php',
          data: emailData,
          method: 'post'
        }).then(function(data) {
          return q.resolve(data);
        }, function(error) {
          return q.reject(error);
        });
        return q.promise;
      }
    };
  }
]);
