/*
 * JavaScript client-side example using jsrsasign
 */

// #########################################################
// #             WARNING   WARNING   WARNING               #
// #########################################################
// #                                                       #
// # This file is intended for demonstration purposes      #
// # only.                                                 #
// #                                                       #
// # It is the SOLE responsibility of YOU, the programmer  #
// # to prevent against unauthorized access to any signing #
// # functions.                                            #
// #                                                       #
// # Organizations that do not protect against un-         #
// # authorized signing will be black-listed to prevent    #
// # software piracy.                                      #
// #                                                       #
// # -QZ Industries, LLC                                   #
// #                                                       #
// #########################################################

/**
 * Depends:
 *     - jsrsasign-latest-all-min.js
 *     - qz-tray.js
 *
 * Steps:
 *
 *     1. Include jsrsasign 10.9.0 into your web page
 *        <script src="https://cdnjs.cloudflare.com/ajax/libs/jsrsasign/11.1.0/jsrsasign-all-min.js"></script>
 *
 *     2. Update the privateKey below with contents from private-key.pem
 *
 *     3. Include this script into your web page
 *        <script src="path/to/sign-message.js"></script>
 *
 *     4. Remove or comment out any other references to "setSignaturePromise"
 *
 *     5. IMPORTANT: Before deploying to production, copy "jsrsasign-all-min.js"
 *        to the web server.  Don't trust the CDN above to be available.
 */
var privateKey ="-----BEGIN PRIVATE KEY-----\n" +
    "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCap5ls1rkldoWh\n" +
    "mV3QFE7hvaH91bQfItJTmXQVfobyEdp1eZppYIxfzN4BA++pKFHYP81akFnZNfpi\n" +
    "N67OHFTIN9TW7hiDC21zPCAdS6xdPvIrJHZsDg3qyZaWSiYVhTIGZIO8TcdUZRPh\n" +
    "pKK4Dt7lulR+BGqveQ0zPmNTswM7/hHYvLWtPMzS48bn4EMj7oPavvhTR2bZsaDw\n" +
    "TYhlwvmNoIrke8fdtNNtf0bn0vEWFTgwTW3eili0b3URyp6Ltc/z4beAnFmeQdbU\n" +
    "TM7IFQFjYoGCS4H7RqEVWxfrBJqDBNQoyDl2b4faE/STTfn6+A4fjid2qF/cf2zp\n" +
    "KrdkZ6TrAgMBAAECggEADS7dNrhlBusAACL1KsAYa0jBbsRROtg6ipLJoO1srmTU\n" +
    "NPBdN79Zp+7sO7TssIQ12dOyexZT+l6ODeJGPd6PYZPUyk94em82cLy+1hB1zGsJ\n" +
    "tKDCkXpvOETf18bRUUNN3NqjmiEdLTYCiFkC3+KwoG+ONUHGIFgWxnf6eo+HZo0j\n" +
    "YXTc2Jif7WLy7HW5+OnHh4+P7X/T0gGcwxHaMn0fqz7R+jG4Zm037Y1G01coFgwm\n" +
    "ryXojP+ayIDOt5NOEVMQQ1pQ5TzbPB00WUwpwnTyg5R4s3IvBj29TURDlPc+CbRu\n" +
    "lIkHzGKOo3fJdir+BROl3Vr4KEpBwHz3cz+k9QeERQKBgQDORTJ4gUy5d0ozOCZr\n" +
    "CyvrAxPwn39ox87eImNqt6vWY5X5cwsag5DuqnP438MYNdHf+C+HjJKECom0KNSl\n" +
    "8yibDVfj0ZaDbtWBi7tF3LoeXyzySODotqgcYlLxMgyEQh+Pvw1VA7c2dK7DxN7n\n" +
    "oWY01S/PTN9WXWO3hy668qrzBwKBgQC/8LyEi6rDvJ3Y6K3jELqx5JwABhf84tOs\n" +
    "HN2GWd9oQERMEFQUBAex8+gpr+VZG3Uw+sDSDAhKtAsi7zzg2k3Zk1ziZBZ46QoE\n" +
    "kCVufvJ0GKuuzSNGGXxsOohaW0P4+VGVen8wujC4rxW71zv9y1hLqz/qidxfi09+\n" +
    "SqHcv54R/QKBgG2m3WCwI7BIWNqHk+y9oJgrJ7N3pox2A2OU1lLJ1wB+KiDUZmeu\n" +
    "3yHw3PvFP/ojyjEMx3+AW/bzfyaVug2KCOD8I+fI6AFwrvFR7bkC0LIKmGMoGN+9\n" +
    "EfsczcjIeVzppcuNnbG+6ut49dq+UlzCMQoO9n51+Bf6R2Mt6sqY7AWLAoGAKw1o\n" +
    "e6KITxdDoJ+wQTpDZhuNEkRLpSGLsRNYbQZDojKoHxeahFLTFwtKi+80VmReSPo1\n" +
    "veeNBJSV2uQml5jf1WnEb9NbZwt+f7+FZd97qqbN+4tv2g1lZzFJ3FqUSIhD0G+F\n" +
    "j/xzaTl8eoGwpyCxUWe8EnORxqyMzBsZa1ZfslECgYBQvUDbxtbh8IKkLGH/+Sqh\n" +
    "o68JrYqDMXHBtwh+tHAGnP8Sog/uqcY5y0E2chqpOkiZARcP5a1d2jc92Mr03/Fg\n" +
    "qJuEIAzEtChCJKK/42DcMg0GHLyuccR6PXqwZF6gNAPPsHaP+xuYrTiGAAlZPn+J\n" +
    "VaR3qoHzfuXztBltGdOUOw==\n" +
    "-----END PRIVATE KEY-----\n";

qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1
qz.security.setSignaturePromise(function(toSign) {
    return function(resolve, reject) {
        try {
            var pk = KEYUTIL.getKey(privateKey);
            var sig = new KJUR.crypto.Signature({"alg": "SHA512withRSA"});  // Use "SHA1withRSA" for QZ Tray 2.0 and older
            sig.init(pk); 
            sig.updateString(toSign);
            var hex = sig.sign();
            console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
            resolve(stob64(hextorstr(hex)));
        } catch (err) {
            console.error(err);
            reject(err);
        }
    };
});
