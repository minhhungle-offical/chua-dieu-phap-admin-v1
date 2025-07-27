import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";

import { primaryLogoUrl } from "@/constants/common";
import { LoginForm } from "../components/LoginForm";
import { VerifyOtpForm } from "../components/VerifyOtpForm";
import { authApi } from "@/api/authApi";
import { maskEmail } from "@/utils/common";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCoolDown, setResendCoolDown] = useState(0); // in seconds

  const navigate = useNavigate();

  useEffect(() => {
    if (resendCoolDown <= 0) return;
    const interval = setInterval(() => {
      setResendCoolDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCoolDown]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const closeOtpDialog = () => {
    setEmail("");
    setResendCoolDown(0);
  };

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.login(data);
      setEmail(res.email);
      setResendCoolDown(300);
      toast.success("Mã xác thực đã được gửi");
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async ({ otp }) => {
    setLoading(true);
    try {
      const res = await authApi.verifyOtp({ email, otp });
      localStorage.setItem("token", res.token);

      navigate("/bang-dieu-khien");
      closeOtpDialog();
      toast.success("Đăng nhập thành công");
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await authApi.resendOtp({ email });
      setResendCoolDown(300);
      toast.success("Đã gửi lại mã xác thực");
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-lg relative">
        <div className="w-[100px] mx-auto">
          <img
            src={primaryLogoUrl}
            alt="Logo"
            className="w-auto object-contain"
          />
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng nhập tài khoản
        </h2>

        <LoginForm loading={loading} onSubmit={handleLogin} />

        {email && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
              <button
                onClick={closeOtpDialog}
                className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
              >
                <FiX />
              </button>

              <div className="w-[100px] mx-auto mb-4">
                <img
                  src={primaryLogoUrl}
                  alt="Logo"
                  className="w-auto object-contain"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Nhập mã xác thực đã gửi tới <br />
                <span className="text-lg font-bold italic text-[#147265]">
                  {maskEmail(email)}
                </span>
              </h3>

              <VerifyOtpForm loading={loading} onSubmit={handleVerifyOtp} />

              <div className="mt-4 text-center">
                {resendCoolDown > 0 ? (
                  <p className="text-sm text-gray-500">
                    Gửi lại mã sau:{" "}
                    <span className="font-medium text-[#147265]">
                      {formatTime(resendCoolDown)}
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-sm text-[#147265] hover:underline disabled:opacity-50"
                  >
                    Gửi lại mã xác thực
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-sm text-[#147265] hover:underline disabled:opacity-50"
                >
                  Gửi lại mã xác thực
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
