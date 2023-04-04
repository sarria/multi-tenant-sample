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
	// REPLACE THIS WITH DATABASE CALL
	const data = JSON.parse(process.env.SITES_DATA);

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
  	return <h1>Page:: {project.domain}:{project.site} - {project[params.slug]} - {params.slug}</h1>;
}
