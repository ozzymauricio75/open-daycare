import { LOGIN_DEFAULT_EMAIL } from "@/app/_data/auth";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen bg-[#FBF4EC] text-ink"
      style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr" }}
    >
      <div
        className="relative overflow-hidden flex flex-col justify-between p-[56px] text-white"
        style={{
          background:
            "linear-gradient(155deg,#F6A98E 0%,#F2937A 45%,#EC7E62 100%)",
          color: "#fff",
        }}
      >
        <div
          className="absolute w-[420px] h-[420px] -top-[140px] -right-[120px]"
          style={{
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "rgba(255,255,255,.12)",
            top: "-140px",
            right: "-120px",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] -bottom-[110px] -left-[80px]"
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,.10)",
            bottom: "-110px",
            left: "-80px",
          }}
        />
        <div className="flex items-center gap-[13px] relative">
          <div
            className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px]"
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "14px",
              background: "rgba(255,255,255,.22)",
            }}
          >
            <svg
              width="26"
              height="26"
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
          <span
            className="font-display font-semibold text-[21px] tracking-[.5px]"
            style={{
              fontFamily: "Fredoka",
              fontWeight: "600",
              fontSize: "21px",
              letterSpacing: ".5px",
            }}
          >
            OpenDayCare
          </span>
        </div>
        <div className="relative">
          <h1
            className="font-display font-semibold text-[42px] leading-[1.12] mb-[18px]"
            style={{
              fontFamily: "Fredoka",
              fontWeight: "600",
              fontSize: "42px",
              lineHeight: "1.12",
              margin: "0 0 18px 0",
            }}
          >
            El día de cada niño,<br />
            compartido con su familia.
          </h1>
          <p className="text-[17px] leading-[1.6] max-w-[430px] text-white/92">
            Publicá momentos, gestioná las salas y mantené a las familias cerca,
            desde un solo lugar.
          </p>
        </div>
        <div className="relative text-[14px] text-white/90">
          🌿 Guardería Sala Soles
        </div>
      </div>

      <div className="flex items-center justify-center p-40">
        <div className="w-full max-w-[392px]">
          <h2
            className="font-display font-semibold text-[30px] mb-[6px] text-ink"
            style={{
              fontFamily: "Fredoka",
              fontWeight: "600",
              fontSize: "30px",
              margin: "0 0 6px",
              color: "#3F362E",
            }}
          >
            Iniciar sesión
          </h2>
          <p className="mb-[28px] text-[15px] text-muted">
            Ingresá para ver el día de hoy.
          </p>

          <div className="text-[12px] font-extrabold tracking-[.7px] text-muted mb-[9px]">
            INGRESO
          </div>

          <div className="text-[12px] font-extrabold tracking-[.7px] text-muted mb-[8px]">
            EMAIL
          </div>
          <input
            type="email"
            defaultValue={LOGIN_DEFAULT_EMAIL}
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
            CONTRASEÑA
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-[16px] py-[14px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-surface text-ink text-[15px] mb-[10px]"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1.5px solid #EADFD0",
              background: "#fff",
              fontSize: "15px",
              color: "#3F362E",
              marginBottom: "10px",
            }}
          />
          <div className="text-right mb-[20px]">
            <a
              href="#"
              className="text-[13.5px] font-extrabold text-[#C5503A]"
              style={{ color: "#C5503A", fontSize: "13.5px", fontWeight: "700" }}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

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
            Iniciar sesión
          </a>

          <p className="mt-[24px] text-center text-[14.5px] text-muted">
            ¿Te invitó la guardería?{" "}
            <a
              href="/activar-cuenta"
              className="text-[#C5503A] font-extrabold"
              style={{ color: "#C5503A", fontWeight: "800" }}
            >
              Activá tu cuenta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
