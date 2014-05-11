smartClassApp.controller('studentsTable', ['$scope', function ($scope) {
    //To do: get from server and make a new data with this parameters
    $scope.data = {
        studentData: [           
            {
                Name: ['Jorge Mcclure', 'Willie Silas Burnett', 'Opal Waller', 'Rubin Faulkner', 'Dion Bentley'],
                Status: ['not_ok_status', 'part_ok_status', 'part_ok_status', 'ok_status', 'part_ok_status']
            },
            {
                Name: ['Lorene Sullivan', 'Cynthia Mejia', 'Jorge Mcclure', 'Willie Silas Burnett', 'Opal Waller'],
                Status: ['ok_status', 'ok_status', 'not_ok_status', 'ok_status', 'part_ok_status']
            },
            {
                Name: ['Lorene Sullivan', 'Willie Silas Burnett', 'Lorna Hess', 'Rubin Faulkner', 'Jorge Mcclure'],
                Status: ['part_ok_status', 'part_ok_status', 'not_ok_status', 'ok_status', 'part_ok_status']
            },
            {
                Name: ['Willie Silas Burnett', 'Jorge Mcclure', 'Opal Waller', 'Rubin Faulkner', 'Dion Bentley'],
                Status: ['ok_status', 'part_ok_status', 'ok_status', 'ok_status', 'part_ok_status']
            },
            {
                Name: ['Lorene Sullivan', 'Cynthia Mejia', 'Willie Silas Burnett', 'Opal Waller', 'Jorge Mcclure'],
                Status: ['not_ok_status', 'part_ok_status', 'not_ok_status', 'ok_status', 'not_ok_status']
            },
        ]
    }
} ])
