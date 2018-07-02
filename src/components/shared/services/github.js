import GitHubClient from "octonode";
import { Base64 } from 'js-base64';

export class GitHubAPI {
	
	constructor ( ) {
		this.delegate = GitHubClient.client();
	}
	
	userExists ( username ) {
		return new Promise( ( resolve, reject ) => {
			this.delegate.get( [ "users", username ].join( "/" ), {}, ( err ) => {
				if ( err && err.statusCode !== 200 ) {
					reject( "GITHUB_USER_NOT_FOUND" );
				} else {
					resolve();
				}
			});
		});
	}
	
	getUserRepos ( username ) {
		return new Promise( ( resolve, reject ) => {
			this.delegate.get( [ "users", username, "repos" ].join( "/" ), {}, ( err, body, data ) => {
				if ( err && err.statusCode !== 200 ) {
					reject( err );
				} else {
					resolve( data );
				}
			});
		});
	}
	
	getRepoReadme ( owner, repo ) {
		return new Promise( ( resolve, reject ) => {
			this.delegate.get( [ "repos", owner, repo, "readme" ].join( "/" ), {}, ( err, body, data ) => {
				if ( err && err.statusCode !== 200 ) {
					reject( err );
				} else {
					resolve( data );
				}
			});
		});
	}
	
	getMarkupDecoded ( encodedMarkup ) {
		return Base64.decode( encodedMarkup );
	}
}