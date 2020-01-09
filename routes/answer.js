var express = require('express');
var router = express.Router();

/* 사용자 질문 받아서 물음표가 있으면 답변을 줌. */
router.post('/', function(req, res, next) {
	
	const user = req.body.userRequest.user.properties.plusfriendUserKey
	const say = req.body.userRequest.utterance;
	//로그 남기기
	console.log(user, ':', say)
	
	let type = false;
	
	if(say.charAt(say.length-1) == '?') type = true;
	
	//반환 값
	let result ={
		version :"2.0",
		data : {
			'ans' : '물음표로 끝나는 의문문으로 물어봐.'
		}
	}
	
	ansList = [
		'안 돼.',
		'안 - 돼.',
		'언젠가는.',
		'가만히 있어.',
		'그건 안 돼.',
		'그것도 안 돼.',
		'그럼.',
		'다시 한 번 물어봐.',
		'그래.',
		'그러던가.',
		'좋아.'
	];
	
	//욕설 필터링
    let words = ["씨발", "병신", "지랄", "미친", "개새", "시발"];
    for (var n = 0; n < words.length; n++) {
		//정규표현식 사용
    	let words2 = say.replace(/[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/gi,"");
        if (words2.indexOf(words[n]) != -1) {
			result.data['ans'] = '욕 하지마라.'
			break;
        }
    }
	
	if(type) result.data['ans'] = ansList[(Math.floor(Math.random() * ansList.length))]
	res.send(result);
});

module.exports = router;
