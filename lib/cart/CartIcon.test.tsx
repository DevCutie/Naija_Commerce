import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartIcon from "@/components/CartIcon";
import { useCartStore } from "@/store/use-cart-store";

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("CartIcon", () => {
  it("should not display the count badge when cart is empty", () => {
    renderWithQueryClient(<CartIcon />);
    const cartCount = screen.queryByTestId("cart-count");
    expect(cartCount).not.toBeInTheDocument();
  });

  it("should display the correct item count when cart has items", () => {
    useCartStore.setState({
      items: [
        {
          variantId: "var-1",
          productId: "prod-1",
          name: "Test Product",
          priceKobo: 1000,
          quantity: 2,
        },
      ],
    });

    renderWithQueryClient(<CartIcon />);

    const cartCount = screen.getByTestId("cart-count");
    expect(cartCount.textContent).toBe("2");
  });
});
