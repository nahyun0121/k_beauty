K_beauty💄
========
화장을 잘 하는 친구들을 부러워 하는 친구들을 종종 봤다(우리도 그렇고).  <br />
그런 친구들은 보통 자신의 얼굴에 맞는 화장법을 잘 알고 화장하는 경우가 많다.<br />
기본 화장법뿐만 아니라 다양한 화장법을 해 볼 수 있도록 자신의 얼굴과 비슷한 뷰티 유튜버를 추천해 준다.<br />

Installation
========
* pip install numpy<br />
* pip install opencv-contrib-python<br />
* pip install matplotlib<br />
* pip install request<br />
* pip install dlib<br />
* pip install boto3<br />

Function
========
1.사진 업로드<br />
*쿠비의 요구 형식에 맞는 사진 업로드 후 성별을 "남자" 혹은 "여자" 형태로 입력한다.<br />

2.얼굴 유사도 분석 및 얼굴 스와핑<br />
 *입력한 성별에 맞는 py파일을 실행 하면 사용자와 가장 닮은 유튜버의 정보가 출력된다.<br />
 *py파일은 사용자 사진과 기존 저장 되어있던 유튜버 사진들을 히스토 분석해 유사도가 가장 높은 유튜버를 뽑아 낸다.<br />
 *그리고 사용자와 유튜버 얼굴을 스와핑 한 사진을 저장해 준다.<br />
 
3.닮은 유튜버 정보 전송<br />
 *py에서 반환하는 닮은 유튜버의 이름, 유튜브 주소, 얼굴 유사도를 line으로 전송해준다.<br />
 *py에서 버킷에 전송해 준 얼굴 합성 파일을 line으로 전송해준다.<br />


Contributing
========
1.프로젝트를 fork 해 주세요. "http://khuhub.khu.ac.kr/2020105576/k_beauty.git"<br />
2.develop 브랜치를 체크아웃 해주세요. "git checkout update"<br />
3.변경사항을 메시지와 함께 commit해 주세요. "git commit -m "NEW"<br />
  ㄴ> 수정 사항도 멘트에 적어주면 감사하겠습니다.<br />
4.브랜치를 push 해 주세요. "git push origin develop"<br />
5.merge request를 요청해 주세요. 이 프로젝트에 기여할 수 있습니다<br />


Api
========
line api<br />
opencv api<br />

## Contact
👤강다현, 김나현<br />
 email: dusdj0813@khu.ac.kr<br />
 email: knh4769@khu.ac.kr

