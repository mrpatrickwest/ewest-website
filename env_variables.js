/*
* This function contains environment variables needed to build
* the site locally or into the staging/production environments.
*
* @parameter 	environment {String}	build environment
* @return		env 		{Object}	environment variables
*   @property 	root_dir 	{String} 	build destination
*   @property 	hostname 	{String} 	sitemap hostname
*   @parameter 	localhost	{Boolean}	local environment
*/
module.exports = function(environment) {
	var env = {};

	switch (environment) {
		case "local":
			env["root_dir"] = "/~westp/ewest/build";
			env["hostname"] = "http://localhost";
			env["localhost"] = true;
			break;
		case "orion":
			env["root_dir"] = "/~pwest";
			env["hostname"] = "http://tw.rpi.edu";
			env["localhost"] = false;
			break;
		case "ewest":
			env["root_dir"] = "/";
			env["hostname"] = "http://ewest.org";
			env["localhost"] = false;
			break;
	}

	return env;
};
