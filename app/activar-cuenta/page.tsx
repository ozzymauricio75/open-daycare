import { ACTIVATION_CHILD, ACTIVATION_CODE, ACTIVATION_EMAIL } from "@/app/_data/auth";

export default function ActivarCuentaPage() {
  return (
    <div
      className="min-h-screen bg-[#FBF4EC] text-ink flex items-center justify-center p-40"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FBF4EC",
        padding: "40px",
      }}
    >
      <div className="w-full max-w-[440px]">
        <div
          className="flex h-[58px] w-[58px] items-center justify-center rounded-[18px] mb-[22px] shadow-[0_12px_26px_-10px_rgba(238,129,100,.65)]"
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "18px",
            background: "linear-gradient(155deg,#F8C3A8,#F2937A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "22px",
            boxShadow: "0 12px 26px -10px rgba(238,129,100,.65)",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </div>

        <h1
          className="font-display font-semibold text-[32px] leading-[1.15] mb-[8px] text-ink"
          style={{
            fontFamily: "Fredoka",
            fontWeight: "600",
            fontSize: "32px",
            lineHeight: "1.15",
            margin: "0 0 8px",
            color: "#3F362E",
          }}
        >
          Bienvenida a OpenDayCare
        </h1>
        <p className="mb-[26px] text-[15.5px] leading-[1.55] text-muted">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para
          activar la cuenta.
        </p>

        <div
          className="flex items-center gap-[14px] border-[1.5px] border-[#EADFD0] bg-surface rounded-[16px] px-[16px] py-[14px] mb-[22px]"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "#fff",
            border: "1.5px solid #EADFD0",
            borderRadius: "16px",
            padding: "14px 16px",
            marginBottom: "22px",
          }}
        >
          <div
            className="flex h-[44px] w-[44px] items-center justify-center rounded-full"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: ACTIVATION_CHILD.avatarBg,
              color: ACTIVATION_CHILD.avatarFg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {ACTIVATION_CHILD.initial}
          </div>
          <div>
            <div className="text-[13px] text-muted">
              Te invitaron a seguir a
            </div>
            <div
              className="font-display font-semibold text-[17px] text-ink"
              style={{
                fontFamily: "Fredoka",
                fontWeight: "600",
                fontSize: "17px",
                color: "#3F362E",
              }}
            >
              {ACTIVATION_CHILD.name} · {ACTIVATION_CHILD.room}
            </div>
          </div>
        </div>

        <div className="text-[12px] font-extrabold tracking-[.7px] text-muted mb-[8px]">
          CÓDIGO DE INVITACIÓN
        </div>
        <input
          defaultValue={ACTIVATION_CODE}
          className="w-full px-[16px] py-[14px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-surface font-display font-bold text-[18px] tracking-[3px] text-ink mb-[18px]"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1.5px solid #EADFD0",
            background: "#fff",
            fontSize: "18px",
            letterSpacing: "3px",
            fontWeight: "700",
            color: "#3F362E",
            marginBottom: "18px",
            fontFamily: "Fredoka",
          }}
        />
        <div className="text-[12px] font-extrabold tracking-[.7px] text-muted mb-[8px]">
          EMAIL
        </div>
        <input
          type="email"
          defaultValue={ACTIVATION_EMAIL}
          className="w-full px-[16px] py-[14px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-surface text-ink text-[15px] mb-[18px]"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1.5px solid #EADFD0",
            background: "#fff",
            fontSize: "15px",
            color: "#3F362E",
            marginBottom: "18px",
          }}
        />
        <div className="text-[12px] font-extrabold tracking-[.7px] text-muted mb-[8px]">
          CREAR CONTRASEÑA
        </div>
        <input
          type="password"
          className="w-full px-[16px] py-[14px] rounded-[14px] border-[1.5px] border-[#F2A78E] bg-surface text-ink text-[15px] mb-[18px]"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1.5px solid #F2A78E",
            background: "#fff",
            fontSize: "15px",
            color: "#3F362E",
            marginBottom: "18px",
          }}
        />

        <label
          className="flex items-start gap-[12px] rounded-[14px] bg-[#FBF1D6] px-[16px] py-[14px] mb-[24px] cursor-pointer"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            background: "#FBF1D6",
            borderRadius: "14px",
            padding: "14px 16px",
            marginBottom: "24px",
            cursor: "pointer",
          }}
        >
          <span
            className="flex-none h-[24px] w-[24px] rounded-[8px] items-center justify-center bg-[#5FB97E] mt-[1px]"
            style={{
              flex: "none",
              width: "24px",
              height: "24px",
              borderRadius: "8px",
              background: "#5FB97E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1px",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="text-[14px] leading-[1.45] text-[#8A7234]">
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro
            de la app.
          </span>
        </label>

        <a
          href="#"
          className="block text-center w-full py-[15px] rounded-[15px] text-white font-extrabold text-[16px]"
          style={{
            display: "block",
            textAlign: "center",
            width: "100%",
            padding: "15px",
            borderRadius: "15px",
            background: "linear-gradient(180deg,#F4977E,#EE8164)",
            color: "#fff",
            fontWeight: "800",
            fontSize: "16px",
            boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
          }}
        >
          Activar mi cuenta
        </a>

        <p className="mt-[22px] text-center text-[14.5px] text-muted">
          ¿Ya tenés cuenta?{" "}
          <a
            href="/login"
            className="text-[#C5503A] font-extrabold"
            style={{ color: "#C5503A", fontWeight: "800" }}
          >
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}
