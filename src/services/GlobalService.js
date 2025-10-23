class GlobalService {
  static loadingRef = null;
  static alertRef = null;
  static webViewRef = null;
  static toastRef = null;
  static bottomSheetRef = null;

  // Loading
  static setLoadingRef(ref) {
    this.loadingRef = ref;
  }
  static showLoading(message = 'Đang tải...') {
    this.loadingRef?.show(message);
  }
  static hideLoading() {
    this.loadingRef?.hide();
  }

  // Alert
  static setAlertRef(ref) {
    this.alertRef = ref;
  }
  static showAlert({ title, message, buttons, type = 'info' }) {
    this.alertRef?.show({ title, message, buttons, type });
  }
  static hideAlert() {
    this.alertRef?.hide();
  }

  // WebView
  static setWebViewRef(ref) {
    this.webViewRef = ref;
  }
  static showWebView(url, title = '') {
    this.webViewRef?.show(url, title);
  }
  static hideWebView() {
    this.webViewRef?.hide();
  }

  // Toast
  static setToastRef(ref) {
    this.toastRef = ref;
  }
  static showToast({ message, type = 'info', duration = 3000 }) {
    this.toastRef?.show({ message, type, duration });
  }

  // Bottom Sheet
  static setBottomSheetRef(ref) {
    this.bottomSheetRef = ref;
  }
  static showBottomSheet({ content, height = 300, title = '' }) {
    this.bottomSheetRef?.show({ content, height, title });
  }
  static hideBottomSheet() {
    this.bottomSheetRef?.hide();
  }
}

export default GlobalService;