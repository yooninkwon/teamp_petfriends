package com.tech.petfriends.helppetf.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.configuration.ApikeyConfig;

@RestController
@RequestMapping("/helppetf")
public class HelpPetfAdoption {

	// api키 주입
	@Autowired
	ApikeyConfig apikeyConfig;

	@GetMapping("/adoptionaaa")
	public ResponseEntity<String> ppap() {

		String apikey = apikeyConfig.getOpenDataApikey();
		HttpURLConnection urlConnection = null;
		InputStream stream = null;
		String result = null;

		// 요청URL: abandonmentPublicSrvc 가 두번 들어가야 나오는게 이상하다. 한번만 넣으면 500에러
		// 함수의 @RequestParam 받아와 사용할 수도 있음
		String urlStr = "https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?" + "serviceKey="
				+ apikey + "&_type=" + "json" + "&pageNo=" + "1" + "&numOfRows=" + "10";

		try {
			// URL: Java application 과 URL간의 API 제공
			// URLConnection의 서브 클래스 - HTTP고유 기능에 대한 지원 제공
			// urlStr(요청 주소)에 대한 URL객체 생성
			// URL 형식이 잘못된 경우 MalformedURLException을 throw
			// try-catch문으로 예외처리
			URL url = new URL(urlStr);

			// URLConnection 인스턴스는 URL 객체의 openConnection() 메소드 호출에 의해 얻어짐
			// * http:// 이므로 URLConnection을 HttpURLConnection으로 캐스팅
			// URL의 openConnection() 메서드는 I/O 오류가 발생하면 IOException을 throw
			urlConnection = (HttpURLConnection) url.openConnection();
			stream = getNetworkConnection(urlConnection); // 하단 메소드
			result = readStreamToString(stream); // 하단 메소드
			// openConnection() 메서드는 실제 네트워크 연결을 설정하지 않고,
			// URLConnection 클래스의 인스턴스만 반환한다.
			// 네트워크 연결은 connect() 메서드가 호출 될 때 명시적으로 이루어지거나,
			// 헤더 필드를 읽거나 입력 스트림/출력 스트림을 가져올 때 암시적으로 이루어진다.

			if (stream != null)
				stream.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {	 // finally: 네트워크 연결 종료
			if (urlConnection != null) {
				urlConnection.disconnect();
			}
		}

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	// URLConnection 을 전달받아 연결정보 설정 후 연결, 연결 후 수신한 InputStream 반환
	private InputStream getNetworkConnection(HttpURLConnection urlConnection) throws IOException {
		// 연결을 설정하기 전에 타임아웃, 캐시, HTTP 요청 방법 등과 같이 클라이언트와 서버 간의 옵션을 설정
		urlConnection.setConnectTimeout(3000);
		urlConnection.setReadTimeout(3000);
		urlConnection.setRequestMethod("GET"); // Method 설정: 기본값 GET / GET, POST, HEAD, OPTIONS, PUT, DELETE, TRACE
		urlConnection.setDoInput(true); // URLConnetion을 서버에서 콘텐츠를 읽는 데 사용할 수 있는지 여부를 설정 (기본값은 true)

		// 연결이 이루어지면 서버는 URL 요청을 처리하고 메타데이터와 실제 콘텐츠로 구성된 response를 보낸다
		// 메타데이터는 헤더 필드라고 하는 key, value 값 쌍의 모입이다
		// 헤더 필드는 서버에 대한 정보, 상태 코드, 프로토콜 정보 등을 나타낸다
		// 헤더 필드를 읽기 위한 다양한 메소드가 있는데 필자는 getResponseCode()를 이용해 서버에서 보낸 HTTP 상태 코드를 체크한다
		if (urlConnection.getResponseCode() != HttpURLConnection.HTTP_OK) {
			// 연결이 OK하지 않을 때:
			throw new IOException("HTTP error code : " + urlConnection.getResponseCode());
		}

		// 실제 내용을 읽기 위해 InputStream 인스턴스를 얻어온다.
		return urlConnection.getInputStream();
	}

	// InputStream을 전달받아 문자열로 변환 후 반환
	private String readStreamToString(InputStream stream) throws IOException {
		StringBuilder result = new StringBuilder();

		// 문자 데이터를 읽기 위해서 InputStream을 InputStreamReader로 wrapping
		// 데이터를 문자열로 읽기 위해 InputStream을 BufferedReader로 wrapping
		// UTF-8로 인코딩
		BufferedReader br = new BufferedReader(new InputStreamReader(stream, "UTF-8"));

		// BufferedReader의 문자열을 한줄씩 읽으며 result에 붙여준다.
		String readLine;
		while ((readLine = br.readLine()) != null) {
			result.append(readLine + "\n\r");
		}
		
		br.close();

		return result.toString();
	}
}
