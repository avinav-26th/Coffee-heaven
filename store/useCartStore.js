// store/useCartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// A simple debounce function
let debounceTimer;
const debounce = (func, delay) => {
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const useCartStore = create(
  persist(
    (set, get) => {
      // The function to sync the cart with the database
      const syncCartWithDB = async (items) => {
        try {
          await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: Object.values(items) }),
          });
        } catch (error) {
          console.error("Failed to sync cart with DB:", error);
        }
      };
      
      const debouncedSync = debounce(syncCartWithDB, 1500); // Wait 1.5s after last change

      return {
        items: {},
        isHydrated: false, // To track if we've loaded from DB
        
        // This function will be called on login to load the DB cart
        hydrateCart: async () => {
          if (get().isHydrated) return; // Prevent re-hydration
          try {
            const res = await fetch('/api/cart');
            if (res.ok) {
              const { cart } = await res.json();
              if (cart && cart.length > 0) {
                const newItems = cart.reduce((acc, item) => {
                  acc[item.name] = item;
                  return acc;
                }, {});
                // Merge DB cart with local cart, giving precedence to DB
                set((state) => ({ items: { ...state.items, ...newItems }, isHydrated: true }));
              } else {
                set({ isHydrated: true });
              }
            }
          } catch (error) {
            console.error("Failed to hydrate cart from DB:", error);
            set({ isHydrated: true }); // Mark as hydrated even on error to prevent loops
          }
        },

        // Modified actions to include DB sync
        addToCart: (item, session) => {
          set((state) => {
            const existingItem = state.items[item.name];
            const newItems = { ...state.items };
            if (existingItem) {
              newItems[item.name] = { ...existingItem, quantity: existingItem.quantity + 1 };
            } else {
              newItems[item.name] = { ...item, quantity: 1 };
            }
            if (session) debouncedSync(newItems); // Sync if user is logged in
            return { items: newItems };
          });
        },

        updateQuantity: (itemName, quantity, session) => {
          set((state) => {
            const newItems = { ...state.items };
            if (quantity <= 0) {
              delete newItems[itemName];
            } else {
              newItems[itemName] = { ...newItems[itemName], quantity };
            }
            if (session) debouncedSync(newItems);
            return { items: newItems };
          });
        },
        
        removeFromCart: (itemName, session) => {
            set((state) => {
                const newItems = { ...state.items };
                delete newItems[itemName];
                if (session) debouncedSync(newItems);
                return { items: newItems };
            })
        },

        clearCart: (session) => {
          set({ items: {} });
          if (session) debouncedSync({});
        },
      };
    },
    {
      name: 'coffee-heaven-cart-storage',
    }
  )
);

export default useCartStore;