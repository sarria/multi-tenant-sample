import React from "react";

export async function getStaticPaths() {
    const paths = [
		{ 
			params: { 
				site: "test" 
			} 
		}, 
		{ 
			params: { 
				site: "test2" 
			} 
		}
	];

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export const getStaticProps = async (context) => {
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
  return <h1>Home Page:: {project.data} for {params.site}</h1>;
}
