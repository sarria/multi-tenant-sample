import React from "react";

export async function getStaticPaths() {
  	const paths = [
		{ 
			params: { 
				site: "test",
				slug: "about"
			} 
		}, 
		{ 
			params: { 
				site: "test2",
				slug: "about"
			} 
		}
	];

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export const getStaticProps = async (context) => {
	const data = [ // REPLACE THIS WITH DATABASE CALL
	  	{ 
			domain: "test", 
	  		about: "This is the about page for test",
			contact: "This is the contact page for test" 
		},
	  	{ 	domain: "test2", 
		  	about: "This is the about content for test2",
			contact: "This is the contact content for test2"
		},
	];

	console.log("context:: ", context)
  
	const project = data.find((p) => p.domain === context.params.site);
  
	if (!project) {
	  return {
		notFound: true,
	  };
	}
  
	return {
	  	props: { 
			project,
			params: context.params
		},
	};
};

export default function Index({ project, params }) {
	console.log("params:: ", params);
  	return <h1>Page:: {project.domain}:{project.site} - {project[params.slug]} - {params.slug}</h1>;
}
