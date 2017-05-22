/**
 * DES加密/解密
 * @Copyright Copyright (c) 2006
 * @author Guapo
 * @see DESCore
 */

/*
 * encrypt the string to string made up of hex
 * return the encrypted string
 */

/* 
	des加密方法   	strEnc(str,key1,key2,key3); 
	des解密方法 	strDec(str,key1,key2,key3);
	base64加密方法 	base64encode(str);
	base64解密方法 	base64decode(str); 
*/
function strEnc(data, firstKey, secondKey, thirdKey) {

	var leng = data.length;
	var encData = "";
	var firstKeyBt, secondKeyBt, thirdKeyBt, firstLength, secondLength, thirdLength;
	if (firstKey != null && firstKey != "") {
		firstKeyBt = getKeyBytes(firstKey);
		firstLength = firstKeyBt.length;
	}
	if (secondKey != null && secondKey != "") {
		secondKeyBt = getKeyBytes(secondKey);
		secondLength = secondKeyBt.length;
	}
	if (thirdKey != null && thirdKey != "") {
		thirdKeyBt = getKeyBytes(thirdKey);
		thirdLength = thirdKeyBt.length;
	}

	if (leng > 0) {
		if (leng < 4) {
			var bt = strToBt(data);
			var encByte;
			if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
				var tempBt;
				var x, y, z;
				tempBt = bt;
				for (x = 0; x < firstLength; x++) {
					tempBt = enc(tempBt, firstKeyBt[x]);
				}
				for (y = 0; y < secondLength; y++) {
					tempBt = enc(tempBt, secondKeyBt[y]);
				}
				for (z = 0; z < thirdLength; z++) {
					tempBt = enc(tempBt, thirdKeyBt[z]);
				}
				encByte = tempBt;
			} else {
				if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
					var tempBt;
					var x, y;
					tempBt = bt;
					for (x = 0; x < firstLength; x++) {
						tempBt = enc(tempBt, firstKeyBt[x]);
					}
					for (y = 0; y < secondLength; y++) {
						tempBt = enc(tempBt, secondKeyBt[y]);
					}
					encByte = tempBt;
				} else {
					if (firstKey != null && firstKey != "") {
						var tempBt;
						var x = 0;
						tempBt = bt;
						for (x = 0; x < firstLength; x++) {
							tempBt = enc(tempBt, firstKeyBt[x]);
						}
						encByte = tempBt;
					}
				}
			}
			encData = bt64ToHex(encByte);
		} else {
			var iterator = parseInt(leng / 4);
			var remainder = leng % 4;
			var i = 0;
			for (i = 0; i < iterator; i++) {
				var tempData = data.substring(i * 4 + 0, i * 4 + 4);
				var tempByte = strToBt(tempData);
				var encByte;
				if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
					var tempBt;
					var x, y, z;
					tempBt = tempByte;
					for (x = 0; x < firstLength; x++) {
						tempBt = enc(tempBt, firstKeyBt[x]);
					}
					for (y = 0; y < secondLength; y++) {
						tempBt = enc(tempBt, secondKeyBt[y]);
					}
					for (z = 0; z < thirdLength; z++) {
						tempBt = enc(tempBt, thirdKeyBt[z]);
					}
					encByte = tempBt;
				} else {
					if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
						var tempBt;
						var x, y;
						tempBt = tempByte;
						for (x = 0; x < firstLength; x++) {
							tempBt = enc(tempBt, firstKeyBt[x]);
						}
						for (y = 0; y < secondLength; y++) {
							tempBt = enc(tempBt, secondKeyBt[y]);
						}
						encByte = tempBt;
					} else {
						if (firstKey != null && firstKey != "") {
							var tempBt;
							var x;
							tempBt = tempByte;
							for (x = 0; x < firstLength; x++) {
								tempBt = enc(tempBt, firstKeyBt[x]);
							}
							encByte = tempBt;
						}
					}
				}
				encData += bt64ToHex(encByte);
			}
			if (remainder > 0) {
				var remainderData = data.substring(iterator * 4 + 0, leng);
				var tempByte = strToBt(remainderData);
				var encByte;
				if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
					var tempBt;
					var x, y, z;
					tempBt = tempByte;
					for (x = 0; x < firstLength; x++) {
						tempBt = enc(tempBt, firstKeyBt[x]);
					}
					for (y = 0; y < secondLength; y++) {
						tempBt = enc(tempBt, secondKeyBt[y]);
					}
					for (z = 0; z < thirdLength; z++) {
						tempBt = enc(tempBt, thirdKeyBt[z]);
					}
					encByte = tempBt;
				} else {
					if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
						var tempBt;
						var x, y;
						tempBt = tempByte;
						for (x = 0; x < firstLength; x++) {
							tempBt = enc(tempBt, firstKeyBt[x]);
						}
						for (y = 0; y < secondLength; y++) {
							tempBt = enc(tempBt, secondKeyBt[y]);
						}
						encByte = tempBt;
					} else {
						if (firstKey != null && firstKey != "") {
							var tempBt;
							var x;
							tempBt = tempByte;
							for (x = 0; x < firstLength; x++) {
								tempBt = enc(tempBt, firstKeyBt[x]);
							}
							encByte = tempBt;
						}
					}
				}
				encData += bt64ToHex(encByte);
			}
		}
	}
	return encData;
}

/*
 * decrypt the encrypted string to the original string
 *
 * return  the original string
 */

function strDec(data, firstKey, secondKey, thirdKey) {
	var leng = data.length;
	var decStr = "";
	var firstKeyBt, secondKeyBt, thirdKeyBt, firstLength, secondLength, thirdLength;
	if (firstKey != null && firstKey != "") {
		firstKeyBt = getKeyBytes(firstKey);
		firstLength = firstKeyBt.length;
	}
	if (secondKey != null && secondKey != "") {
		secondKeyBt = getKeyBytes(secondKey);
		secondLength = secondKeyBt.length;
	}
	if (thirdKey != null && thirdKey != "") {
		thirdKeyBt = getKeyBytes(thirdKey);
		thirdLength = thirdKeyBt.length;
	}

	var iterator = parseInt(leng / 16);
	var i = 0;
	for (i = 0; i < iterator; i++) {
		var tempData = data.substring(i * 16 + 0, i * 16 + 16);
		var strByte = hexToBt64(tempData);
		var intByte = new Array(64);
		var j = 0;
		for (j = 0; j < 64; j++) {
			intByte[j] = parseInt(strByte.substring(j, j + 1));
		}
		var decByte;
		if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
			var tempBt;
			var x, y, z;
			tempBt = intByte;
			for (x = thirdLength - 1; x >= 0; x--) {
				tempBt = dec(tempBt, thirdKeyBt[x]);
			}
			for (y = secondLength - 1; y >= 0; y--) {
				tempBt = dec(tempBt, secondKeyBt[y]);
			}
			for (z = firstLength - 1; z >= 0; z--) {
				tempBt = dec(tempBt, firstKeyBt[z]);
			}
			decByte = tempBt;
		} else {
			if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
				var tempBt;
				var x, y, z;
				tempBt = intByte;
				for (x = secondLength - 1; x >= 0; x--) {
					tempBt = dec(tempBt, secondKeyBt[x]);
				}
				for (y = firstLength - 1; y >= 0; y--) {
					tempBt = dec(tempBt, firstKeyBt[y]);
				}
				decByte = tempBt;
			} else {
				if (firstKey != null && firstKey != "") {
					var tempBt;
					var x, y, z;
					tempBt = intByte;
					for (x = firstLength - 1; x >= 0; x--) {
						tempBt = dec(tempBt, firstKeyBt[x]);
					}
					decByte = tempBt;
				}
			}
		}
		decStr += byteToString(decByte);
	}
	return decStr;
}
/*
 * chang the string into the bit array
 *
 * return bit array(it's length % 64 = 0)
 */

function getKeyBytes(key) {
	var keyBytes = new Array();
	var leng = key.length;
	var iterator = parseInt(leng / 4);
	var remainder = leng % 4;
	var i = 0;
	for (i = 0; i < iterator; i++) {
		keyBytes[i] = strToBt(key.substring(i * 4 + 0, i * 4 + 4));
	}
	if (remainder > 0) {
		keyBytes[i] = strToBt(key.substring(i * 4 + 0, leng));
	}
	return keyBytes;
}

/*
 * chang the string(it's length <= 4) into the bit array
 *
 * return bit array(it's length = 64)
 */

function strToBt(str) {
	var leng = str.length;
	var bt = new Array(64);
	if (leng < 4) {
		var i = 0,
			j = 0,
			p = 0,
			q = 0;
		for (i = 0; i < leng; i++) {
			var k = str.charCodeAt(i);
			for (j = 0; j < 16; j++) {
				var pow = 1,
					m = 0;
				for (m = 15; m > j; m--) {
					pow *= 2;
				}
				bt[16 * i + j] = parseInt(k / pow) % 2;
			}
		}
		for (p = leng; p < 4; p++) {
			var k = 0;
			for (q = 0; q < 16; q++) {
				var pow = 1,
					m = 0;
				for (m = 15; m > q; m--) {
					pow *= 2;
				}
				bt[16 * p + q] = parseInt(k / pow) % 2;
			}
		}
	} else {
		for (i = 0; i < 4; i++) {
			var k = str.charCodeAt(i);
			for (j = 0; j < 16; j++) {
				var pow = 1;
				for (m = 15; m > j; m--) {
					pow *= 2;
				}
				bt[16 * i + j] = parseInt(k / pow) % 2;
			}
		}
	}
	return bt;
}

/*
 * chang the bit(it's length = 4) into the hex
 *
 * return hex
 */

function bt4ToHex(binary) {
	var hex;
	switch (binary) {
	case "0000":
		hex = "0";
		break;
	case "0001":
		hex = "1";
		break;
	case "0010":
		hex = "2";
		break;
	case "0011":
		hex = "3";
		break;
	case "0100":
		hex = "4";
		break;
	case "0101":
		hex = "5";
		break;
	case "0110":
		hex = "6";
		break;
	case "0111":
		hex = "7";
		break;
	case "1000":
		hex = "8";
		break;
	case "1001":
		hex = "9";
		break;
	case "1010":
		hex = "A";
		break;
	case "1011":
		hex = "B";
		break;
	case "1100":
		hex = "C";
		break;
	case "1101":
		hex = "D";
		break;
	case "1110":
		hex = "E";
		break;
	case "1111":
		hex = "F";
		break;
	}
	return hex;
}

/*
 * chang the hex into the bit(it's length = 4)
 *
 * return the bit(it's length = 4)
 */

function hexToBt4(hex) {
	var binary;
	switch (hex) {
	case "0":
		binary = "0000";
		break;
	case "1":
		binary = "0001";
		break;
	case "2":
		binary = "0010";
		break;
	case "3":
		binary = "0011";
		break;
	case "4":
		binary = "0100";
		break;
	case "5":
		binary = "0101";
		break;
	case "6":
		binary = "0110";
		break;
	case "7":
		binary = "0111";
		break;
	case "8":
		binary = "1000";
		break;
	case "9":
		binary = "1001";
		break;
	case "A":
		binary = "1010";
		break;
	case "B":
		binary = "1011";
		break;
	case "C":
		binary = "1100";
		break;
	case "D":
		binary = "1101";
		break;
	case "E":
		binary = "1110";
		break;
	case "F":
		binary = "1111";
		break;
	}
	return binary;
}

/*
 * chang the bit(it's length = 64) into the string
 *
 * return string
 */

function byteToString(byteData) {
	var str = "";
	for (i = 0; i < 4; i++) {
		var count = 0;
		for (j = 0; j < 16; j++) {
			var pow = 1;
			for (m = 15; m > j; m--) {
				pow *= 2;
			}
			count += byteData[16 * i + j] * pow;
		}
		if (count != 0) {
			str += String.fromCharCode(count);
		}
	}
	return str;
}

function bt64ToHex(byteData) {
	var hex = "";
	for (i = 0; i < 16; i++) {
		var bt = "";
		for (j = 0; j < 4; j++) {
			bt += byteData[i * 4 + j];
		}
		hex += bt4ToHex(bt);
	}
	return hex;
}

function hexToBt64(hex) {
	var binary = "";
	for (i = 0; i < 16; i++) {
		binary += hexToBt4(hex.substring(i, i + 1));
	}
	return binary;
}

/*
 * the 64 bit des core arithmetic
 */

function enc(dataByte, keyByte) {
	var keys = generateKeys(keyByte);
	var ipByte = initPermute(dataByte);
	var ipLeft = new Array(32);
	var ipRight = new Array(32);
	var tempLeft = new Array(32);
	var i = 0,
		j = 0,
		k = 0,
		m = 0,
		n = 0;
	for (k = 0; k < 32; k++) {
		ipLeft[k] = ipByte[k];
		ipRight[k] = ipByte[32 + k];
	}
	for (i = 0; i < 16; i++) {
		for (j = 0; j < 32; j++) {
			tempLeft[j] = ipLeft[j];
			ipLeft[j] = ipRight[j];
		}
		var key = new Array(48);
		for (m = 0; m < 48; m++) {
			key[m] = keys[i][m];
		}
		var tempRight = xor(pPermute(sBoxPermute(xor(expandPermute(ipRight), key))), tempLeft);
		for (n = 0; n < 32; n++) {
			ipRight[n] = tempRight[n];
		}

	}


	var finalData = new Array(64);
	for (i = 0; i < 32; i++) {
		finalData[i] = ipRight[i];
		finalData[32 + i] = ipLeft[i];
	}
	return finallyPermute(finalData);
}

function dec(dataByte, keyByte) {
	var keys = generateKeys(keyByte);
	var ipByte = initPermute(dataByte);
	var ipLeft = new Array(32);
	var ipRight = new Array(32);
	var tempLeft = new Array(32);
	var i = 0,
		j = 0,
		k = 0,
		m = 0,
		n = 0;
	for (k = 0; k < 32; k++) {
		ipLeft[k] = ipByte[k];
		ipRight[k] = ipByte[32 + k];
	}
	for (i = 15; i >= 0; i--) {
		for (j = 0; j < 32; j++) {
			tempLeft[j] = ipLeft[j];
			ipLeft[j] = ipRight[j];
		}
		var key = new Array(48);
		for (m = 0; m < 48; m++) {
			key[m] = keys[i][m];
		}

		var tempRight = xor(pPermute(sBoxPermute(xor(expandPermute(ipRight), key))), tempLeft);
		for (n = 0; n < 32; n++) {
			ipRight[n] = tempRight[n];
		}
	}


	var finalData = new Array(64);
	for (i = 0; i < 32; i++) {
		finalData[i] = ipRight[i];
		finalData[32 + i] = ipLeft[i];
	}
	return finallyPermute(finalData);
}

function initPermute(originalData) {
	var ipByte = new Array(64);
	for (i = 0, m = 1, n = 0; i < 4; i++, m += 2, n += 2) {
		for (j = 7, k = 0; j >= 0; j--, k++) {
			ipByte[i * 8 + k] = originalData[j * 8 + m];
			ipByte[i * 8 + k + 32] = originalData[j * 8 + n];
		}
	}
	return ipByte;
}

function expandPermute(rightData) {
	var epByte = new Array(48);
	for (i = 0; i < 8; i++) {
		if (i == 0) {
			epByte[i * 6 + 0] = rightData[31];
		} else {
			epByte[i * 6 + 0] = rightData[i * 4 - 1];
		}
		epByte[i * 6 + 1] = rightData[i * 4 + 0];
		epByte[i * 6 + 2] = rightData[i * 4 + 1];
		epByte[i * 6 + 3] = rightData[i * 4 + 2];
		epByte[i * 6 + 4] = rightData[i * 4 + 3];
		if (i == 7) {
			epByte[i * 6 + 5] = rightData[0];
		} else {
			epByte[i * 6 + 5] = rightData[i * 4 + 4];
		}
	}
	return epByte;
}

function xor(byteOne, byteTwo) {
	var xorByte = new Array(byteOne.length);
	for (i = 0; i < byteOne.length; i++) {
		xorByte[i] = byteOne[i] ^ byteTwo[i];
	}
	return xorByte;
}

function sBoxPermute(expandByte) {

	var sBoxByte = new Array(32);
	var binary = "";
	var s1 = [
		[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
		[0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
		[4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
		[15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
	];

	/* Table - s2 */
	var s2 = [
		[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
		[3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
		[0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
		[13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
	];

	/* Table - s3 */
	var s3 = [
		[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
		[13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
		[13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
		[1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
	]; /* Table - s4 */
	var s4 = [
		[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
		[13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
		[10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
		[3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
	];

	/* Table - s5 */
	var s5 = [
		[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
		[14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
		[4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
		[11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
	];

	/* Table - s6 */
	var s6 = [
		[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
		[10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
		[9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
		[4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
	];

	/* Table - s7 */
	var s7 = [
		[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
		[13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
		[1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
		[6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
	];

	/* Table - s8 */
	var s8 = [
		[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
		[1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
		[7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
		[2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
	];

	for (m = 0; m < 8; m++) {
		var i = 0,
			j = 0;
		i = expandByte[m * 6 + 0] * 2 + expandByte[m * 6 + 5];
		j = expandByte[m * 6 + 1] * 2 * 2 * 2 + expandByte[m * 6 + 2] * 2 * 2 + expandByte[m * 6 + 3] * 2 + expandByte[m * 6 + 4];
		switch (m) {
		case 0:
			binary = getBoxBinary(s1[i][j]);
			break;
		case 1:
			binary = getBoxBinary(s2[i][j]);
			break;
		case 2:
			binary = getBoxBinary(s3[i][j]);
			break;
		case 3:
			binary = getBoxBinary(s4[i][j]);
			break;
		case 4:
			binary = getBoxBinary(s5[i][j]);
			break;
		case 5:
			binary = getBoxBinary(s6[i][j]);
			break;
		case 6:
			binary = getBoxBinary(s7[i][j]);
			break;
		case 7:
			binary = getBoxBinary(s8[i][j]);
			break;
		}
		sBoxByte[m * 4 + 0] = parseInt(binary.substring(0, 1));
		sBoxByte[m * 4 + 1] = parseInt(binary.substring(1, 2));
		sBoxByte[m * 4 + 2] = parseInt(binary.substring(2, 3));
		sBoxByte[m * 4 + 3] = parseInt(binary.substring(3, 4));
	}
	return sBoxByte;
}

function pPermute(sBoxByte) {
	var pBoxPermute = new Array(32);
	pBoxPermute[0] = sBoxByte[15];
	pBoxPermute[1] = sBoxByte[6];
	pBoxPermute[2] = sBoxByte[19];
	pBoxPermute[3] = sBoxByte[20];
	pBoxPermute[4] = sBoxByte[28];
	pBoxPermute[5] = sBoxByte[11];
	pBoxPermute[6] = sBoxByte[27];
	pBoxPermute[7] = sBoxByte[16];
	pBoxPermute[8] = sBoxByte[0];
	pBoxPermute[9] = sBoxByte[14];
	pBoxPermute[10] = sBoxByte[22];
	pBoxPermute[11] = sBoxByte[25];
	pBoxPermute[12] = sBoxByte[4];
	pBoxPermute[13] = sBoxByte[17];
	pBoxPermute[14] = sBoxByte[30];
	pBoxPermute[15] = sBoxByte[9];
	pBoxPermute[16] = sBoxByte[1];
	pBoxPermute[17] = sBoxByte[7];
	pBoxPermute[18] = sBoxByte[23];
	pBoxPermute[19] = sBoxByte[13];
	pBoxPermute[20] = sBoxByte[31];
	pBoxPermute[21] = sBoxByte[26];
	pBoxPermute[22] = sBoxByte[2];
	pBoxPermute[23] = sBoxByte[8];
	pBoxPermute[24] = sBoxByte[18];
	pBoxPermute[25] = sBoxByte[12];
	pBoxPermute[26] = sBoxByte[29];
	pBoxPermute[27] = sBoxByte[5];
	pBoxPermute[28] = sBoxByte[21];
	pBoxPermute[29] = sBoxByte[10];
	pBoxPermute[30] = sBoxByte[3];
	pBoxPermute[31] = sBoxByte[24];
	return pBoxPermute;
}

function finallyPermute(endByte) {
	var fpByte = new Array(64);
	fpByte[0] = endByte[39];
	fpByte[1] = endByte[7];
	fpByte[2] = endByte[47];
	fpByte[3] = endByte[15];
	fpByte[4] = endByte[55];
	fpByte[5] = endByte[23];
	fpByte[6] = endByte[63];
	fpByte[7] = endByte[31];
	fpByte[8] = endByte[38];
	fpByte[9] = endByte[6];
	fpByte[10] = endByte[46];
	fpByte[11] = endByte[14];
	fpByte[12] = endByte[54];
	fpByte[13] = endByte[22];
	fpByte[14] = endByte[62];
	fpByte[15] = endByte[30];
	fpByte[16] = endByte[37];
	fpByte[17] = endByte[5];
	fpByte[18] = endByte[45];
	fpByte[19] = endByte[13];
	fpByte[20] = endByte[53];
	fpByte[21] = endByte[21];
	fpByte[22] = endByte[61];
	fpByte[23] = endByte[29];
	fpByte[24] = endByte[36];
	fpByte[25] = endByte[4];
	fpByte[26] = endByte[44];
	fpByte[27] = endByte[12];
	fpByte[28] = endByte[52];
	fpByte[29] = endByte[20];
	fpByte[30] = endByte[60];
	fpByte[31] = endByte[28];
	fpByte[32] = endByte[35];
	fpByte[33] = endByte[3];
	fpByte[34] = endByte[43];
	fpByte[35] = endByte[11];
	fpByte[36] = endByte[51];
	fpByte[37] = endByte[19];
	fpByte[38] = endByte[59];
	fpByte[39] = endByte[27];
	fpByte[40] = endByte[34];
	fpByte[41] = endByte[2];
	fpByte[42] = endByte[42];
	fpByte[43] = endByte[10];
	fpByte[44] = endByte[50];
	fpByte[45] = endByte[18];
	fpByte[46] = endByte[58];
	fpByte[47] = endByte[26];
	fpByte[48] = endByte[33];
	fpByte[49] = endByte[1];
	fpByte[50] = endByte[41];
	fpByte[51] = endByte[9];
	fpByte[52] = endByte[49];
	fpByte[53] = endByte[17];
	fpByte[54] = endByte[57];
	fpByte[55] = endByte[25];
	fpByte[56] = endByte[32];
	fpByte[57] = endByte[0];
	fpByte[58] = endByte[40];
	fpByte[59] = endByte[8];
	fpByte[60] = endByte[48];
	fpByte[61] = endByte[16];
	fpByte[62] = endByte[56];
	fpByte[63] = endByte[24];
	return fpByte;
}

function getBoxBinary(i) {
	var binary = "";
	switch (i) {
	case 0:
		binary = "0000";
		break;
	case 1:
		binary = "0001";
		break;
	case 2:
		binary = "0010";
		break;
	case 3:
		binary = "0011";
		break;
	case 4:
		binary = "0100";
		break;
	case 5:
		binary = "0101";
		break;
	case 6:
		binary = "0110";
		break;
	case 7:
		binary = "0111";
		break;
	case 8:
		binary = "1000";
		break;
	case 9:
		binary = "1001";
		break;
	case 10:
		binary = "1010";
		break;
	case 11:
		binary = "1011";
		break;
	case 12:
		binary = "1100";
		break;
	case 13:
		binary = "1101";
		break;
	case 14:
		binary = "1110";
		break;
	case 15:
		binary = "1111";
		break;
	}
	return binary;
}
/*
 * generate 16 keys for xor
 *
 */

function generateKeys(keyByte) {
	var key = new Array(56);
	var keys = new Array();

	keys[0] = new Array();
	keys[1] = new Array();
	keys[2] = new Array();
	keys[3] = new Array();
	keys[4] = new Array();
	keys[5] = new Array();
	keys[6] = new Array();
	keys[7] = new Array();
	keys[8] = new Array();
	keys[9] = new Array();
	keys[10] = new Array();
	keys[11] = new Array();
	keys[12] = new Array();
	keys[13] = new Array();
	keys[14] = new Array();
	keys[15] = new Array();
	var loop = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

	for (i = 0; i < 7; i++) {
		for (j = 0, k = 7; j < 8; j++, k--) {
			key[i * 8 + j] = keyByte[8 * k + i];
		}
	}

	var i = 0;
	for (i = 0; i < 16; i++) {
		var tempLeft = 0;
		var tempRight = 0;
		for (j = 0; j < loop[i]; j++) {
			tempLeft = key[0];
			tempRight = key[28];
			for (k = 0; k < 27; k++) {
				key[k] = key[k + 1];
				key[28 + k] = key[29 + k];
			}
			key[27] = tempLeft;
			key[55] = tempRight;
		}
		var tempKey = new Array(48);
		tempKey[0] = key[13];
		tempKey[1] = key[16];
		tempKey[2] = key[10];
		tempKey[3] = key[23];
		tempKey[4] = key[0];
		tempKey[5] = key[4];
		tempKey[6] = key[2];
		tempKey[7] = key[27];
		tempKey[8] = key[14];
		tempKey[9] = key[5];
		tempKey[10] = key[20];
		tempKey[11] = key[9];
		tempKey[12] = key[22];
		tempKey[13] = key[18];
		tempKey[14] = key[11];
		tempKey[15] = key[3];
		tempKey[16] = key[25];
		tempKey[17] = key[7];
		tempKey[18] = key[15];
		tempKey[19] = key[6];
		tempKey[20] = key[26];
		tempKey[21] = key[19];
		tempKey[22] = key[12];
		tempKey[23] = key[1];
		tempKey[24] = key[40];
		tempKey[25] = key[51];
		tempKey[26] = key[30];
		tempKey[27] = key[36];
		tempKey[28] = key[46];
		tempKey[29] = key[54];
		tempKey[30] = key[29];
		tempKey[31] = key[39];
		tempKey[32] = key[50];
		tempKey[33] = key[44];
		tempKey[34] = key[32];
		tempKey[35] = key[47];
		tempKey[36] = key[43];
		tempKey[37] = key[48];
		tempKey[38] = key[38];
		tempKey[39] = key[55];
		tempKey[40] = key[33];
		tempKey[41] = key[52];
		tempKey[42] = key[45];
		tempKey[43] = key[41];
		tempKey[44] = key[49];
		tempKey[45] = key[35];
		tempKey[46] = key[28];
		tempKey[47] = key[31];
		switch (i) {
		case 0:
			for (m = 0; m < 48; m++) {
				keys[0][m] = tempKey[m];
			}
			break;
		case 1:
			for (m = 0; m < 48; m++) {
				keys[1][m] = tempKey[m];
			}
			break;
		case 2:
			for (m = 0; m < 48; m++) {
				keys[2][m] = tempKey[m];
			}
			break;
		case 3:
			for (m = 0; m < 48; m++) {
				keys[3][m] = tempKey[m];
			}
			break;
		case 4:
			for (m = 0; m < 48; m++) {
				keys[4][m] = tempKey[m];
			}
			break;
		case 5:
			for (m = 0; m < 48; m++) {
				keys[5][m] = tempKey[m];
			}
			break;
		case 6:
			for (m = 0; m < 48; m++) {
				keys[6][m] = tempKey[m];
			}
			break;
		case 7:
			for (m = 0; m < 48; m++) {
				keys[7][m] = tempKey[m];
			}
			break;
		case 8:
			for (m = 0; m < 48; m++) {
				keys[8][m] = tempKey[m];
			}
			break;
		case 9:
			for (m = 0; m < 48; m++) {
				keys[9][m] = tempKey[m];
			}
			break;
		case 10:
			for (m = 0; m < 48; m++) {
				keys[10][m] = tempKey[m];
			}
			break;
		case 11:
			for (m = 0; m < 48; m++) {
				keys[11][m] = tempKey[m];
			}
			break;
		case 12:
			for (m = 0; m < 48; m++) {
				keys[12][m] = tempKey[m];
			}
			break;
		case 13:
			for (m = 0; m < 48; m++) {
				keys[13][m] = tempKey[m];
			}
			break;
		case 14:
			for (m = 0; m < 48; m++) {
				keys[14][m] = tempKey[m];
			}
			break;
		case 15:
			for (m = 0; m < 48; m++) {
				keys[15][m] = tempKey[m];
			}
			break;
		}
	}
	return keys;
}

var base64encodechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64decodechars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64encodechars.charAt(c1 >> 2);
			out += base64encodechars.charAt((c1 & 0x3) << 4);
			out += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64encodechars.charAt(c1 >> 2);
			out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
			out += base64encodechars.charAt((c2 & 0xf) << 2);
			out += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64encodechars.charAt(c1 >> 2);
		out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
		out += base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
		out += base64encodechars.charAt(c3 & 0x3f);
	}
	return out;
}

function base64decode(str) {
	var c1, c2, c3, c4;
	var i, len, out;

	len = str.length;

	i = 0;
	out = "";
	while (i < len) {

		do {
			c1 = base64decodechars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1) break;

		do {
			c2 = base64decodechars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1) break;

		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61) return out;
			c3 = base64decodechars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1) break;

		out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));

		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61) return out;
			c4 = base64decodechars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1) break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out;
}

/** 
* 
*  Base64 encode / decode 
* 
*  @author haitao.tu 
*  @date   2010-04-26 
*  @email  tuhaitao@foxmail.com 
* 
*/  
   
function Base64() {  
   
    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
   
    // public method for encoding  
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
        return output;  
    }  
   
    // public method for decoding  
    this.decode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output);  
        return output;  
    }  
   
    // private method for UTF-8 encoding  
    _utf8_encode = function (string) {  
        string = string.replace(/\r\n/g,"\n");  
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  
            } else if((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  
   
        }  
        return utftext;  
    }  
   
    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {  
        var string = "";  
        var i = 0;  
        var c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  
                c3 = utftext.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
        }  
        return string;  
    }  
}

/*
	-----------------------------------------md5加密-------------------------------------------------------
*/
	
/**
 * jQuery MD5 hash algorithm function
 * 
 * 	<code>
 * 		Calculate the md5 hash of a String 
 * 		String $.md5 ( String str )
 * 	</code>
 * 
 * Calculates the MD5 hash of str using the » RSA Data Security, Inc. MD5 Message-Digest Algorithm, and returns that hash. 
 * MD5 (Message-Digest algorithm 5) is a widely-used cryptographic hash function with a 128-bit hash value. MD5 has been employed in a wide variety of security applications, and is also commonly used to check the integrity of data. The generated hash is also non-reversable. Data cannot be retrieved from the message digest, the digest uniquely identifies the data.
 * MD5 was developed by Professor Ronald L. Rivest in 1994. Its 128 bit (16 byte) message digest makes it a faster implementation than SHA-1.
 * This script is used to process a variable length message into a fixed-length output of 128 bits using the MD5 algorithm. It is fully compatible with UTF-8 encoding. It is very useful when u want to transfer encrypted passwords over the internet. If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag). 
 * This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin.
 * 
 * Example
 * 	Code
 * 		<code>
 * 			$.md5("I'm Persian."); 
 * 		</code>
 * 	Result
 * 		<code>
 * 			"b8c901d0f02223f9761016cfff9d68df"
 * 		</code>
 * 
 * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
 * @link http://www.semnanweb.com/jquery-plugin/md5.html
 * @see http://www.webtoolkit.info/
 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
 * @param {jQuery} {md5:function(string))
 * @return string
 */

(function($){
	
	var rotateLeft = function(lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	}
	
	var addUnsigned = function(lX, lY) {
		var lX4, lY4, lX8, lY8, lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		if (lX4 | lY4) {
			if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}
	
	var F = function(x, y, z) {
		return (x & y) | ((~ x) & z);
	}
	
	var G = function(x, y, z) {
		return (x & z) | (y & (~ z));
	}
	
	var H = function(x, y, z) {
		return (x ^ y ^ z);
	}
	
	var I = function(x, y, z) {
		return (y ^ (x | (~ z)));
	}
	
	var FF = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var GG = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var HH = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var II = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var convertToWordArray = function(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWordsTempOne = lMessageLength + 8;
		var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
		var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
		var lWordArray = Array(lNumberOfWords - 1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while (lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		lBytePosition = (lByteCount % 4) * 8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		return lWordArray;
	};
	
	var wordToHex = function(lValue) {
		var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValueTemp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
		}
		return WordToHexValue;
	};
	
	var uTF8Encode = function(string) {
		string = string.replace(/\x0d\x0a/g, "\x0a");
		var output = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				output += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				output += String.fromCharCode((c >> 6) | 192);
				output += String.fromCharCode((c & 63) | 128);
			} else {
				output += String.fromCharCode((c >> 12) | 224);
				output += String.fromCharCode(((c >> 6) & 63) | 128);
				output += String.fromCharCode((c & 63) | 128);
			}
		}
		return output;
	};
	
	$.extend({
		md5: function(string) {
			var x = Array();
			var k, AA, BB, CC, DD, a, b, c, d;
			var S11=7, S12=12, S13=17, S14=22;
			var S21=5, S22=9 , S23=14, S24=20;
			var S31=4, S32=11, S33=16, S34=23;
			var S41=6, S42=10, S43=15, S44=21;
			string = uTF8Encode(string);
			x = convertToWordArray(string);
			a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
			for (k = 0; k < x.length; k += 16) {
				AA = a; BB = b; CC = c; DD = d;
				a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
				d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
				c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
				b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
				a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
				d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
				c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
				b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
				a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
				d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
				c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
				b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
				a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
				d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
				c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
				b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
				a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
				d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
				c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
				b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
				a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
				d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
				c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
				b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
				a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
				d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
				c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
				b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
				a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
				d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
				c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
				b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
				a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
				d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
				c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
				b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
				a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
				d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
				c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
				b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
				a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
				d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
				c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
				b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
				a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
				d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
				c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
				b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
				a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
				d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
				c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
				b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
				a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
				d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
				c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
				b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
				a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
				d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
				c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
				b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
				a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
				d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
				c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
				b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
				a = addUnsigned(a, AA);
				b = addUnsigned(b, BB);
				c = addUnsigned(c, CC);
				d = addUnsigned(d, DD);
			}
			var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
			return tempValue.toLowerCase();
		}
	});
})(jQuery);