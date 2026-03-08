import { Bell, Plus, LogOut, Menu } from "lucide-react";

interface AdminTopbarProps {
  activePanel: string;
  onLogout: () => void;
  onMobileMenu: () => void;
}

const AdminTopbar = ({ activePanel, onLogout, onMobileMenu }: AdminTopbarProps) => (
  <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
    <div className="flex items-center gap-3">
      <button onClick={onMobileMenu} className="md:hidden text-foreground">
        <Menu size={20} />
      </button>
      <span className="font-semibold text-foreground capitalize">{activePanel}</span>
    </div>
    <div className="flex items-center gap-3">
      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
        <Bell size={18} />
      </button>
      <button className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors">
        <Plus size={16} /> Nueva noticia
      </button>
      <button onClick={onLogout} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
        <LogOut size={18} />
      </button>
    </div>
  </header>
);

export default AdminTopbar;
