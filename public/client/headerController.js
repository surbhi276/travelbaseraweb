'use Strict';

app.controller('headerController', function($scope, $http,constant, $location,$sce,$anchorScroll,commonFactory,$window){
 
  $anchorScroll();

  function splitByName(str){
  if(str){
    return str.split('-')[1]
  }
 };


 var pathName = (window.location.pathname || '').split('/')[1];
  $scope.showHeader = false;
 if(pathName.toLowerCase() == 'holiday-details') $scope.showHeader = true;
 
  $scope.getCountryStates = function(){
    $http.get(constant.BASE_URL+constant.STATESBYCOUNTRY).then(function success(res){
               $scope.destinations_Menu = res.data.data; 
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
      });
  };
  $scope.getCountryStates();

  $scope.getContactDetails = function(){
    $http.get(constant.BASE_URL+constant.CONTACT_DETAILS).then(function success(res){  
               $scope.contactsDetails = res.data.data;  
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
      });
  };
  $scope.getContactDetails();
  $scope.aboutus = function(){
    $http.get(constant.BASE_URL+constant.ABOUT_US).then(function success(res){
               $scope.aboutuse = res.data.data;
               $scope.about_data = $sce.trustAsHtml(res.data.data.description);
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
      });
  };
   $scope.aboutus();
  
$scope.categories = function(){
    $http.get(constant.BASE_URL+constant.CATEGORIES).then(function success(res){
               $scope.categories = res.data.data;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
      });
  };
  $scope.categories();
  
  $scope.redirectToCities = function(country,name, code){ 
    var country = splitByName(country); 
    $location.path('/holidays/'+country.toLowerCase()+'/cities').search({id: code+'-'+name})
  };
  $scope.redirectToPackages = function(name, code){
    $location.path('/package-category/'+code+'-'+name)
  };
  $scope.viewAllStates = function(d){
    localStorage.setItem('listOfStates',JSON.stringify(d));
    var country = splitByName(d._id).split(' ').join('-');
    $location.path('/states/'+country);
  }
  $scope.exploreThemes = function(){
    $location.path('/themes');
  }


  $scope.changeUrl = function(name){
    var obj='';
    if(name == 'ab') obj = '/about-us';
    else if(name == 'ca') obj = '/career';
    else if(name == 'fa') obj = '/faq';
    else if(name == 'cu') obj = '/contact-us';
    else if(name == 'tc') obj = '/terms-and-condition';

    $location.path(obj); 
  }

  $scope.OpenNewLink =  function(url){
    $window.open(url, '_blank');
  }

   
})