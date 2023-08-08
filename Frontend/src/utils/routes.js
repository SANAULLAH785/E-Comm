const AUTH_ROUTES = {
    login: '/login',
    signup: '/signup',
    forgotPassword: '/forgot-password',
  };
  
  const PROTECTED_ROUTES_NAMES = {
    root: '/',
    addproduct: '/addproduct',
    teams: '/teams',
    blogs: '/blogs/*',
    careers: '/careers',
    projects: '/projects',
    employees: '/employees',
    techstacks: '/techstacks',
    jobCreate: '/jobs/create',
    jobEdit: '/jobs/edit/:id',
    departments: '/departments',
    teamsCreate: '/teams/create',
    blogsCreate: '/blogs/create',
    designations: '/designations',
    projectsCreate: '/projects/create',
    viewProjects: '/projects/view/:id',
    editProjects: '/projects/edit/:id',
    employeesCreate: '/employees/create',
    employeesEdit: '/employees/edit/:id',
    employeesView: '/employees/view/:id',
    teamView: '/teams/view/:id',
    teamEdit: '/teams/edit/:id',
    teamCreate: '/teams/create',
    edittechstack: '/techstacks/edit/:id',
    techstacksCreate: '/techstacks/create',
    departmentsCreate: '/departments/create',
    editdepartments: '/departments/edit/:id',
    editdesignation: '/designations/edit/:id',
    designationsCreate: '/designations/create',
    createServices: '/services/create',
    editServices: '/services/edit/:id',
    services: '/services',
  };
  
  export const ROUTES = { AUTH_ROUTES, PROTECTED_ROUTES_NAMES };
  