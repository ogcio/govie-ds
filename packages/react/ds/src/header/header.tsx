import { variables } from "@govie-ds/tokens";
import styles from "./header.module.css";

export function Header() {
  return (
    <div>
      <h1
        className={styles.foo}
        style={{
          backgroundColor: variables.primitive.color.emerald["200"],
        }}
      >
        Header
      </h1>
    </div>
  );
}
