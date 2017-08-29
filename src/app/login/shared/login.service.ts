import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

const CLIENT_ID: string = '896598308259-ctam2k664e2am1gob7khg1tg0hhj5peo.apps.googleusercontent.com';
const CLIENT_SECRET: string = 'OrE1SBX8qLdVoHtJyXdSBnL8';
const REDIRECT_URI: string = 'http://local.ui.com:4200/login';

@Injectable()
export class LoginService {

    constructor(
        private http: Http,
    ) { }

    navigateToGoogleLogin() {
        location.href = 'https://accounts.google.com/o/oauth2/v2/auth?state=state_parameter_passthrough_value&response_type=code&client_id=' + CLIENT_ID +
            '&redirect_uri=' + location.href + '&scope=email%20profile';
    }

    getAccessToken(code: string): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        const options = new RequestOptions({ headers: headers });
        let body = new URLSearchParams();
        body.set('code', decodeURIComponent(code));
        body.set('client_id', CLIENT_ID);
        body.set('client_secret', CLIENT_SECRET);
        body.set('redirect_uri', REDIRECT_URI);
        body.set('grant_type', 'authorization_code');
        return this.http.post('https://www.googleapis.com/oauth2/v4/token', body, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    googleUser(accessToken: string): Observable<any> {
        const headers = new Headers({
            'Authorization': 'Bearer ' + accessToken
        });
        const options = new RequestOptions({ headers: headers });
        return this.http.get('https://www.googleapis.com/userinfo/v2/me?fields=email%2Cid%2Cname', options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }

}