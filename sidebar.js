/**
 * Dolfin Sidebar Components
 * Handles dynamic sidebar rendering for Retail and Distributor portals.
 */

class SidebarSystem {
    constructor(role, activePageId) {
        this.role = role;
        this.activePageId = activePageId;
        this.containerId = "sidebar-container";
    }

    getRetailItems() {
        return [
            { id: 'dashboard', label: 'Dashboard', url: 'retail_dashboard.html' },
            { id: 'catalog', label: 'Catalog', url: 'retail_catalog.html' },
            { id: 'orders', label: 'Transaksi', url: 'retail_orders.html' },
            { id: 'payment', label: 'Payment', url: 'retail_payment_management.html' },
            { type: 'divider' },
            { id: 'profile', label: 'Profile', url: 'retail_profile.html' }
        ];
    }

    getDistributorItems() {
        return [
            { id: 'dashboard', label: 'Dashboard', url: 'distributor_dashboard.html' },
            { id: 'orders', label: 'Orders (Retail)', url: 'distributor_orders.html' },
            { id: 'batch', label: 'Batch Invoices', url: 'distributor_batch_management.html' },
            { id: 'inventory', label: 'Inventory', url: 'distributor_inventory.html' },
            { id: 'promotions', label: 'Promotions', url: 'distributor_promotions.html' },
            { type: 'divider' },
            { id: 'profile', label: 'Profile', url: 'distributor_profile.html' }
        ];
    }

    getAdminItems() {
        return [
            { id: 'dashboard', label: 'Dashboard', url: 'admin_dashboard.html' },
            { id: 'users', label: 'User Management', url: 'admin_users.html' },
            { type: 'divider' },
            { id: 'settings', label: 'Settings', url: 'admin_settings.html' }
        ];
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Sidebar container #${this.containerId} not found`);
            return;
        }

        let items;
        if (this.role === 'retail') {
            items = this.getRetailItems();
        } else if (this.role === 'distributor') {
            items = this.getDistributorItems();
        } else if (this.role === 'admin') {
            items = this.getAdminItems();
        } else {
            items = [];
        }

        let html = `
            <div class="card shadow-sm sidebar">
                <div class="card-body p-2">
                    <div class="list-group list-group-flush">
        `;

        items.forEach(item => {
            if (item.type === 'divider') {
                html += `<div class="dropdown-divider"></div>`;
            } else {
                const activeClass = this.activePageId === item.id ? 'active' : '';
                const disabledClass = item.disabled ? 'disabled' : '';
                const href = item.disabled ? '#' : item.url;

                html += `
                    <a class="list-group-item list-group-item-action nav-pill ${activeClass} ${disabledClass}" 
                       href="${href}">
                        ${item.label}
                    </a>
                `;
            }
        });

        html += `
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }
}
