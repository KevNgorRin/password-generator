const allLetters = "abcdefghijklmnopqrstuvwxyz",
  allNumbers = "0123456789",
  allSymbols = "~!@#$%^&*()_+-=[]{}.,";

export default function useRandom({
  length,
  lowercase,
  uppercase,
  numbers,
  symbols,
}) {
  let ch = "";
  lowercase && (ch += allLetters);
  uppercase && (ch += allLetters.toUpperCase());
  numbers && (ch += allNumbers);
  symbols && (ch += allSymbols);
  if (ch.length === 0) return "1234";
  return Array(length)
    .fill("")
    .map(() => ch[Math.floor(Math.random() * ch.length)])
    .join("");
}
