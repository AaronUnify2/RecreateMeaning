// viz.js — interactive article visualizations for The Post Idealist
// Loaded as a Babel-transpiled script. Exposes window.ARTICLE_VIZ_MODULES.
const { useState, useEffect, useCallback } = React;

    function PizzaSliderViz() {
      const [slices, setSlices] = useState(0);
      const maxSlices = 8;
      const enjoyData = [0, 95, 85, 68, 45, 20, 5, -10, -25];
      const regretData = [0, 0, 0, 5, 15, 35, 55, 75, 90];
      const labels = ["", "Transcendent. This is why pizza exists.", "Excellent. Nearly as good as the first.", "Good. You're still glad you ordered.", "Fine. This is just eating now.", "Why. You don't want this but you're eating it.", "Your body is asking you to stop.", "You have made an enemy of your stomach.", "Congratulations. You hate pizza now."];
      const enjoyment = enjoyData[slices] || 0;
      const regret = regretData[slices] || 0;

      return (
        <div style={{ border: "2px solid #333366", background: "#0a0a18", padding: "24px", margin: "28px 0" }}>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: "#e67e22", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px", textAlign: "center" }}>The Pizza Experiment</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
            {Array.from({ length: maxSlices }).map((_, i) => (
              <div key={i} onClick={() => setSlices(i + 1)} style={{
                width: "48px", height: "48px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px", background: i < slices ? (enjoyData[i+1] > 40 ? "#2a3a1a" : enjoyData[i+1] > 0 ? "#2a2a1a" : "#3a1a1a") : "#12122a",
                border: "1px solid " + (i < slices ? (enjoyData[i+1] > 40 ? "#4a8a3a" : enjoyData[i+1] > 0 ? "#8a8a3a" : "#8a3a3a") : "#222244"),
                transition: "all 0.2s", borderRadius: "4px"
              }}>{i < slices ? "\uD83C\uDF55" : "\u25CB"}</div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button onClick={() => setSlices(0)} style={{ background: "none", border: "1px solid #333366", color: "#666680", fontFamily: "'VT323', monospace", fontSize: "13px", padding: "4px 16px", cursor: "pointer" }}>Reset</button>
          </div>
          {slices > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "14px", color: "#e8e8d0", textAlign: "center", marginBottom: "4px" }}>Slice {slices} of {maxSlices}</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: "14px", color: enjoyment > 40 ? "#4a9a4a" : enjoyment > 0 ? "#c0a060" : "#aa3333", textAlign: "center", fontStyle: "italic" }}>{labels[slices]}</div>
            </div>
          )}
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "13px", color: "#4a9a4a", letterSpacing: "1px", marginBottom: "6px" }}>ENJOYMENT</div>
              <div style={{ height: "20px", background: "#12122a", border: "1px solid #222244", overflow: "hidden" }}>
                <div style={{ height: "100%", width: Math.max(0, enjoyment) + "%", background: enjoyment > 60 ? "linear-gradient(90deg, #2d7a2d, #4a9a4a)" : enjoyment > 30 ? "linear-gradient(90deg, #7a7a2d, #9a9a4a)" : "linear-gradient(90deg, #4a3a2d, #6a5a3a)", transition: "all 0.4s ease" }} />
              </div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "18px", color: enjoyment > 0 ? "#4a9a4a" : "#aa3333", textAlign: "right", marginTop: "4px" }}>{enjoyment > 0 ? enjoyment + "%" : enjoyment + "%"}</div>
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "13px", color: "#aa3333", letterSpacing: "1px", marginBottom: "6px" }}>REGRET</div>
              <div style={{ height: "20px", background: "#12122a", border: "1px solid #222244", overflow: "hidden" }}>
                <div style={{ height: "100%", width: regret + "%", background: regret > 50 ? "linear-gradient(90deg, #7a2d2d, #aa3333)" : "linear-gradient(90deg, #5a3a2d, #7a4a3a)", transition: "all 0.4s ease" }} />
              </div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "18px", color: regret > 30 ? "#aa3333" : "#666680", textAlign: "right", marginTop: "4px" }}>{regret}%</div>
            </div>
          </div>
          {slices >= 5 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #aa3333", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              {slices === 5 && "You knew this was coming. You ate it anyway."}
              {slices === 6 && "The pizza hasn't changed. You have."}
              {slices === 7 && "This is no longer about hunger. This is about something else entirely."}
              {slices === 8 && "You just ate 8 slices of pizza in an economics article. The opportunity cost of this experiment was reading the rest of the article sooner. But you had to click every single one, didn't you."}
            </div>
          )}
        </div>
      );
    }

    function OvenSimViz() {
      const [guests, setGuests] = useState(0);
      const [ovens, setOvens] = useState(1);
      const maxGuests = 96;
      const ovenCap = 6;
      const totalCap = ovenCap * ovens;
      const withinCapacity = guests <= totalCap;
      const ovenCost = 100;

      const getCostPerGuest = (g, o) => {
        if (g === 0) return 0;
        const baseCost = o * ovenCost;
        const foodCost = g * 8;
        const workerCost = o > 1 ? (o - 1) * 40 : 0;
        return Math.round((baseCost + foodCost + workerCost) / g);
      };

      const costPerGuest = getCostPerGuest(guests, ovens);
      const prevCost = guests > 1 ? getCostPerGuest(guests - 1, ovens) : 0;
      const costDelta = guests > 1 ? costPerGuest - prevCost : 0;

      const ovenSlots = [];
      for (let o = 0; o < ovens; o++) {
        const slots = [];
        for (let s = 0; s < ovenCap; s++) {
          const guestIdx = o * ovenCap + s;
          slots.push(guestIdx < guests);
        }
        ovenSlots.push(slots);
      }

      const needsNewOven = guests > totalCap;
      const justCrossedThreshold = guests > 0 && guests === totalCap + 1;

      return (
        <div style={{ border: "2px solid #333366", background: "#0a0a18", padding: "24px", margin: "28px 0" }}>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: "#e67e22", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px", textAlign: "center" }}>The Kitchen Simulator</div>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
            <button onClick={() => { setGuests(g => Math.max(0, g - 1)); }} style={{ background: "#12122a", border: "1px solid #333366", color: "#e8e8d0", fontFamily: "'VT323', monospace", fontSize: "20px", width: "40px", height: "40px", cursor: "pointer" }}>{"\u2212"}</button>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: "28px", color: "#e8e8d0", display: "flex", alignItems: "center", minWidth: "140px", justifyContent: "center" }}>{guests} Guest{guests !== 1 ? "s" : ""}</div>
            <button onClick={() => { if (guests < maxGuests) setGuests(g => g + 1); }} style={{ background: "#12122a", border: "1px solid " + (needsNewOven ? "#aa3333" : "#333366"), color: needsNewOven ? "#aa3333" : "#e8e8d0", fontFamily: "'VT323', monospace", fontSize: "20px", width: "40px", height: "40px", cursor: "pointer" }}>+</button>
          </div>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
            {ovenSlots.map((slots, oi) => (
              <div key={oi} style={{ border: "2px solid " + (slots.every(s => s) ? "#aa3333" : "#4a4a8a"), background: "#12122a", padding: "12px", minWidth: "140px", transition: "border-color 0.3s" }}>
                <div style={{ fontFamily: "'VT323', monospace", fontSize: "12px", color: "#666680", textAlign: "center", marginBottom: "8px" }}>OVEN {oi + 1}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px" }}>
                  {slots.map((filled, si) => (
                    <div key={si} style={{ width: "36px", height: "24px", background: filled ? "#e67e2244" : "#1a1a2e", border: "1px solid " + (filled ? "#e67e22" : "#222244"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", transition: "all 0.2s" }}>{filled ? "\uD83C\uDF72" : ""}</div>
                  ))}
                </div>
                <div style={{ fontFamily: "'VT323', monospace", fontSize: "11px", color: slots.every(s => s) ? "#aa3333" : "#4a9a4a", textAlign: "center", marginTop: "6px" }}>{slots.filter(s => s).length}/{ovenCap} {slots.every(s => s) ? "FULL" : ""}</div>
              </div>
            ))}
          </div>

          {needsNewOven && (
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "14px", color: "#aa3333", marginBottom: "8px" }}>{"\u26A0"} CAPACITY EXCEEDED — Guest {guests} needs a new oven!</div>
              <button onClick={() => setOvens(o => o + 1)} style={{ background: "#aa3333", color: "#fff", border: "none", padding: "8px 24px", fontFamily: "'Courier Prime', monospace", fontSize: "13px", cursor: "pointer", letterSpacing: "1px" }}>Buy Oven #{ovens + 1} ($100)</button>
            </div>
          )}

          <div style={{ marginTop: "16px" }}>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: "13px", color: "#4a9aea", letterSpacing: "1px", marginBottom: "8px" }}>COST PER GUEST</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "100px", padding: "0 4px" }}>
              {Array.from({ length: Math.max(guests, 1) }).map((_, i) => {
                const c = getCostPerGuest(i + 1, i + 1 > ovenCap ? Math.ceil((i + 1) / ovenCap) : ovens > 1 && i + 1 > ovenCap * (ovens - 1) ? ovens : i + 1 <= ovenCap ? 1 : ovens);
                const actualC = getCostPerGuest(i + 1, Math.ceil((i + 1) / ovenCap));
                const h = Math.min(95, Math.max(10, actualC * 0.6));
                const isSpike = i > 0 && actualC > getCostPerGuest(i, Math.ceil(i / ovenCap)) + 10;
                return <div key={i} style={{ flex: 1, maxWidth: "36px", height: h + "%", background: isSpike ? "linear-gradient(180deg, #aa3333, #7a2222)" : "linear-gradient(180deg, #4a9aea, #2a6aaa)", border: "1px solid " + (isSpike ? "#cc4444" : "#5ab0ff"), borderBottom: "none", transition: "height 0.3s", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "2px" }}>
                  <span style={{ fontFamily: "'VT323', monospace", fontSize: "10px", color: "#fff" }}>{i + 1}</span>
                </div>;
              })}
            </div>
            <div style={{ height: "2px", background: "#333366" }} />
          </div>

          {guests > 0 && (
            <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: "#e8e8d0" }}>Cost per guest: <span style={{ color: costDelta > 5 ? "#aa3333" : costDelta < -3 ? "#4a9a4a" : "#e67e22" }}>${costPerGuest}</span></div>
              {guests > 1 && <div style={{ fontFamily: "'VT323', monospace", fontSize: "14px", color: costDelta > 0 ? "#aa3333" : "#4a9a4a" }}>{costDelta > 0 ? "\u25B2" : "\u25BC"} ${Math.abs(costDelta)} vs previous guest</div>}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <button onClick={() => { setGuests(0); setOvens(1); }} style={{ background: "none", border: "1px solid #333366", color: "#666680", fontFamily: "'VT323', monospace", fontSize: "13px", padding: "4px 16px", cursor: "pointer" }}>Reset Kitchen</button>
          </div>

          {guests >= 6 && guests <= totalCap && ovens === 1 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #e67e22", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              The oven is getting full. Each guest is still getting cheaper — but you can feel the ceiling approaching.
            </div>
          )}
          {ovens === 2 && guests <= ovenCap + 2 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #4a9aea", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              New oven, new cost spike. You're paying for capacity you haven't filled yet. Keep adding guests — the economics will recover.
            </div>
          )}
          {ovens >= 2 && guests >= totalCap - 1 && guests <= totalCap && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #4a9a4a", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              Look at that — cost per guest is dropping again. The second oven is paying for itself. This is economies of scale recovering after a capital threshold.
            </div>
          )}
          {guests >= 20 && guests < 40 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #e67e22", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              This is no longer a dinner party. This is a catering operation. You're going to need staff. And parking.
            </div>
          )}
          {guests >= 40 && guests < 60 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #e67e22", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              You are now running a restaurant. You will need a health inspection, a liquor licence, and a therapist.
            </div>
          )}
          {guests >= 60 && guests < 80 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #aa3333", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              Sixty guests. You've crossed from hospitality into logistics. Someone is eating in the garden. Someone else is eating in the car.
            </div>
          )}
          {guests >= 80 && guests < 96 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #aa3333", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              You are now feeding a small wedding. The original four guests have not been seen for some time. They may have left. No one noticed.
            </div>
          )}
          {guests >= 96 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #aa3333", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              96 guests. 16 ovens. You started this article trying to learn about economies of scale and you ended up building an industrial kitchen. The opportunity cost of clicking this button 96 times was reading the rest of the article. You are living proof of the Fifth Slice.
            </div>
          )}
        </div>
      );
    }

    function HegemmonicaSystemViz() {
      const initModules = [
        { id: "sales", name: "Sales", health: 82, improved: 0, bottleneck: false },
        { id: "onboarding", name: "Onboarding", health: 31, improved: 0, bottleneck: true },
        { id: "accounting", name: "Accounting", health: 88, improved: 0, bottleneck: false },
        { id: "website", name: "Website", health: 55, improved: 0, bottleneck: false },
        { id: "support", name: "Support", health: 50, improved: 0, bottleneck: false },
        { id: "filing", name: "Shared Drive", health: 93, improved: 0, bottleneck: false }
      ];
      const [modules, setModules] = useState(initModules);
      const [energy, setEnergy] = useState(7);
      const [log, setLog] = useState([]);
      const [ascended, setAscended] = useState(false);
      const maxEnergy = 7;

      const filing = modules.find(m => m.id === "filing");
      const filingPerfect = filing && filing.health >= 100;

      const improve = (id) => {
        if (energy <= 0) return;
        setModules(prev => {
          const next = prev.map(m => {
            if (m.id !== id) return m;
            const newHealth = m.id === "filing" ? Math.min(100, m.health + 1) : Math.min(99, m.health + 8);
            return { ...m, health: newHealth, improved: m.improved + 1 };
          });
          const f = next.find(m => m.id === "filing");
          if (f && f.health >= 100) {
            setAscended(true);
            return next.map(m => ({ ...m, health: 100 }));
          }
          return next;
        });
        setEnergy(e => e - 1);
        const mod = modules.find(m => m.id === id);
        if (id === "filing") {
          const clicks = mod.improved + 1;
          const msgs = [
            "You improved Shared Drive. It's still 99%. Nothing visible changed.",
            "You improved Shared Drive again. Still 99%. The folders are... more organised, maybe?",
            "Third time on the Shared Drive. Still 99%. You are aware the Onboarding module is at 31%, right?",
            "Four energy on a module that was already at 99%. This is the behaviour the article is about.",
            "Five. You've spent five improvement points on the Shared Drive. It has not moved. It will not move. It doesn't need to move.",
            "Six energy on the Shared Drive. You have one energy left. Onboarding is still broken. We are begging you.",
            "...oh."
          ];
          setLog(l => [...l, msgs[Math.min(clicks - 1, msgs.length - 1)]]);
        } else if (mod.bottleneck) {
          setLog(l => [...l, "You improved " + mod.name + ". This was the limiting factor. Good use of energy."]);
        } else if (mod.health >= 80) {
          setLog(l => [...l, "You improved " + mod.name + " from " + mod.health + "% to " + Math.min(99, mod.health + 8) + "%. It was already fine. That energy is gone now."]);
        } else {
          setLog(l => [...l, "You improved " + mod.name + ". Not the limiting factor, but at least it needed some work."]);
        }
      };

      const reset = () => { setModules(initModules); setEnergy(maxEnergy); setLog([]); setAscended(false); };
      const bottleneck = modules.find(m => m.bottleneck);
      const systemHealth = Math.min(...modules.map(m => (m.id === "filing" && m.health < 100) ? 99 : m.health));
      const wastedEnergy = modules.reduce((sum, m) => sum + ((!m.bottleneck && m.health >= 80) ? m.improved : 0), 0);
      const filingImproved = filing ? filing.improved : 0;

      return (
        <div style={{ border: "2px solid " + (ascended ? "#ffd700" : "#333366"), background: ascended ? "#0f0f10" : "#0a0a18", padding: "24px", margin: "28px 0", transition: "all 0.5s" }}>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: ascended ? "#ffd700" : "#e67e22", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", textAlign: "center" }}>{ascended ? "Perfection Achieved" : "System Diagram"}</div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "12px", color: "#666680", textAlign: "center", marginBottom: "16px" }}>{ascended ? "Every module is at 100%. The shared drive has ascended." : "You have " + energy + " improvement" + (energy !== 1 ? "s" : "") + " to spend. Click a module to improve it."}</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
            {modules.map(m => {
              const displayHealth = (m.id === "filing" && m.health < 100) ? 99 : m.health;
              const col = displayHealth >= 100 ? "#ffd700" : displayHealth >= 80 ? "#4a9a4a" : displayHealth >= 60 ? "#c0a060" : "#aa3333";
              const pulse = m.bottleneck && m.improved === 0 && !ascended;
              return (
                <div key={m.id} onClick={() => improve(m.id)} style={{
                  border: "2px solid " + (pulse ? "#aa3333" : col), background: ascended ? "#12120a" : "#12122a", padding: "12px", cursor: energy > 0 && !ascended ? "pointer" : "default",
                  transition: "all 0.3s", opacity: energy > 0 || ascended ? 1 : 0.6,
                  boxShadow: pulse ? "0 0 12px #aa333366, inset 0 0 12px #aa333322" : ascended ? "0 0 8px #ffd70033" : "none"
                }}>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: "13px", color: col, letterSpacing: "1px", marginBottom: "6px" }}>{m.name}</div>
                  <div style={{ height: "8px", background: "#1a1a2e", border: "1px solid #222244", marginBottom: "4px" }}>
                    <div style={{ height: "100%", width: displayHealth + "%", background: displayHealth >= 100 ? "linear-gradient(90deg, #ffd700, #ffaa00)" : col, transition: "all 0.4s" }} />
                  </div>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: "14px", color: col, textAlign: "right" }}>{displayHealth}%</div>
                  {m.improved > 0 && <div style={{ fontFamily: "'VT323', monospace", fontSize: "11px", color: "#666680", marginTop: "4px" }}>Improved {m.improved}x</div>}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: "14px", color: "#e8e8d0" }}>System Output: <span style={{ color: ascended ? "#ffd700" : systemHealth >= 60 ? "#4a9a4a" : "#aa3333" }}>{systemHealth}%</span> <span style={{ color: "#666680", fontSize: "12px" }}>{ascended ? "(transcendent)" : "(limited by weakest module)"}</span></div>
            <div style={{ display: "flex", gap: "4px" }}>{Array.from({ length: maxEnergy }).map((_, i) => (
              <div key={i} style={{ width: "16px", height: "16px", background: i < energy ? "#e67e22" : "#222244", border: "1px solid " + (i < energy ? "#e67e22" : "#333366"), transition: "all 0.3s" }} />
            ))}</div>
          </div>

          {log.length > 0 && (
            <div style={{ maxHeight: "120px", overflowY: "auto", marginBottom: "12px", padding: "8px", background: "#0f0f1a", border: "1px solid #222244" }}>
              {log.map((l, i) => <div key={i} style={{ fontFamily: "'Courier Prime', monospace", fontSize: "12px", color: l.includes("limiting factor") || l.includes("Perfection") ? "#4a9a4a" : l.includes("already fine") || l.includes("choosing this") ? "#aa3333" : "#c0a060", marginBottom: "4px" }}>{"> " + l}</div>)}
            </div>
          )}

          {ascended && (
            <div style={{ padding: "16px", background: "#1a1a08", border: "2px solid #ffd700", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#ffd700", textAlign: "center", marginBottom: "12px" }}>
              We... we owe you an apology. We wrote an entire article about how the Shared Drive didn't need improving, and you went ahead and improved it to 100%, and — look at this. Everything is at 100%. Every module. We can't explain it. We've never seen it happen before. The Onboarding module fixed itself. Support and Website somehow jumped to perfection. The entire system is running flawlessly and all you did was organise some folders.<br /><br />
              We take it all back. We just never saw the vision. You were right about the Shared Drive. You were always right about the Shared Drive.
            </div>
          )}

          {energy === 0 && !ascended && (
            <div style={{ padding: "12px", background: "#1a1520", border: "1px dashed " + (bottleneck.improved > 0 ? "#4a9a4a" : "#aa3333"), fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic", marginBottom: "12px" }}>
              {bottleneck.improved === 0 && wastedEnergy >= 3 && "You spent all your energy and never touched Onboarding — the one module that was actually failing. The system output didn't change. Everything you improved was already fine."}
              {bottleneck.improved === 0 && wastedEnergy < 3 && "You didn't fix the limiting factor. The system is still limited by its weakest module — no matter how much you improved everything else."}
              {bottleneck.improved > 0 && bottleneck.improved < 3 && "You found the limiting factor, but you also spent energy on modules that were already working. Partial credit."}
              {bottleneck.improved >= 3 && wastedEnergy < 2 && "You identified the limiting factor and focused your energy on it. The system output improved because the weakest link got stronger. This is triage."}
              {bottleneck.improved >= 3 && wastedEnergy >= 2 && "You found the limiting factor but couldn't resist tinkering with things that were already working. The Shared Drive was at 99%. It did not need you."}
              {filingImproved > 0 && !ascended && " The Shared Drive was hegemonica."}
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <button onClick={reset} style={{ background: "none", border: "1px solid " + (ascended ? "#ffd700" : "#333366"), color: ascended ? "#ffd700" : "#666680", fontFamily: "'VT323', monospace", fontSize: "13px", padding: "4px 16px", cursor: "pointer" }}>{ascended ? "Return to Reality" : "Reset System"}</button>
          </div>
        </div>
      );
    }

    function CompoundSimViz() {
      const [weekly, setWeekly] = useState(0);
      const [years, setYears] = useState(5);
      const rate = 0.07;

      const calculate = (w, y) => {
        if (w === 0) return Array(y + 1).fill(0);
        const pts = [0];
        let total = 0;
        for (let yr = 1; yr <= y; yr++) {
          for (let wk = 0; wk < 52; wk++) {
            total += w;
            total *= 1 + rate / 52;
          }
          pts.push(Math.round(total));
        }
        return pts;
      };

      const data = calculate(weekly, years);
      const maxVal = Math.max(...data, 1);
      const totalSaved = weekly * 52 * years;
      const interest = data[years] - totalSaved;

      const presets = [
        { label: "$0", value: 0 },
        { label: "$10", value: 10 },
        { label: "$25", value: 25 },
        { label: "$50", value: 50 }
      ];

      return (
        <div style={{ border: "2px solid #333366", background: "#0a0a18", padding: "24px", margin: "28px 0" }}>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: "#e67e22", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px", textAlign: "center" }}>The Compound Curve</div>

          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            {presets.map(p => (
              <button key={p.value} onClick={() => setWeekly(p.value)} style={{
                background: weekly === p.value ? "#4a9aea" : "#12122a", border: "1px solid " + (weekly === p.value ? "#4a9aea" : "#333366"),
                color: weekly === p.value ? "#fff" : "#888880", fontFamily: "'VT323', monospace", fontSize: "16px", padding: "6px 16px", cursor: "pointer", transition: "all 0.2s"
              }}>{p.label}/week</button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            {[5, 10, 20, 30].map(y => (
              <button key={y} onClick={() => setYears(y)} style={{
                background: years === y ? "#e67e22" : "#12122a", border: "1px solid " + (years === y ? "#e67e22" : "#333366"),
                color: years === y ? "#fff" : "#888880", fontFamily: "'VT323', monospace", fontSize: "14px", padding: "4px 12px", cursor: "pointer", transition: "all 0.2s"
              }}>{y} years</button>
            ))}
          </div>

          <div style={{ height: "160px", display: "flex", alignItems: "flex-end", gap: "2px", padding: "0 4px", marginBottom: "4px" }}>
            {data.map((val, i) => {
              const h = maxVal > 0 ? (val / maxVal) * 100 : 0;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                  <div style={{
                    width: "100%", maxWidth: "28px", height: h + "%", minHeight: i === 0 && weekly === 0 ? "0px" : i === 0 ? "2px" : "0px",
                    background: weekly === 0 ? "#333366" : "linear-gradient(180deg, #4a9aea, #2a6aaa)",
                    border: h > 0 ? "1px solid " + (weekly === 0 ? "#444466" : "#5ab0ff") : "none", borderBottom: "none",
                    transition: "height 0.5s ease"
                  }} />
                </div>
              );
            })}
          </div>
          <div style={{ height: "2px", background: "#333366", marginBottom: "8px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'VT323', monospace", fontSize: "11px", color: "#555560" }}>
            <span>Year 0</span><span>Year {years}</span>
          </div>

          <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "12px", color: "#666680" }}>TOTAL SAVED</div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "22px", color: "#e8e8d0" }}>${totalSaved.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "12px", color: "#666680" }}>COMPOUND INTEREST</div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "22px", color: interest > 0 ? "#4a9a4a" : "#555560" }}>${interest > 0 ? interest.toLocaleString() : "0"}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "12px", color: "#666680" }}>TOTAL VALUE</div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "22px", color: data[years] > 0 ? "#e67e22" : "#555560" }}>${data[years] > 0 ? data[years].toLocaleString() : "0"}</div>
            </div>
          </div>

          {weekly === 0 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #aa3333", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              This is zero. Zero for one year and zero for thirty years look exactly the same. Nothing compounds from nothing. Click any amount to start.
            </div>
          )}
          {weekly === 10 && years >= 20 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #4a9aea", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              Ten dollars a week. A coffee and a sandwich. Look at what the curve does with that over {years} years. This is why zero and ten are different universes.
            </div>
          )}
          {weekly === 50 && years >= 20 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #4a9a4a", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              The interest alone is now larger than what you put in. The curve is doing the work. This is what compound growth looks like when you give it time. All it needed was a start.
            </div>
          )}
          {weekly > 0 && years === 30 && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#1a1520", border: "1px dashed #e67e22", fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic" }}>
              Thirty years ago someone started putting ${weekly} a week aside. They probably felt silly at the time. They don't feel silly now.
            </div>
          )}
        </div>
      );
    }

    function RippleSimViz() {
      const canvasRef = React.useRef(null);
      const [activeRing, setActiveRing] = useState(-1);
      const frameRef = React.useRef(0);
      const ringLabels = ["Source", "Inner Circle", "Early Adopters", "Mainstream", "Last to Know"];
      const ringColors = ["#ffd700", "#4a9aea", "#4a9a4a", "#c0a060", "#aa3333"];
      const ringDescs = [
        "The lab. The boardroom. The group chat. You made it or you were in the room when it was made.",
        "Journalists, analysts, the person who follows the right accounts. Still early. Best positions still available.",
        "The trend piece. The conference talk. Information is public now. Acting on it still helps, but the advantage is shrinking.",
        "The headline. The evening news. The thing everyone's talking about. It's priced in. You're not early.",
        "The dinner party, six months later. \"Did you know that...\" Yes. Everyone knew."
      ];

      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = 570, H = 280;
        let anim;

        function render() {
          frameRef.current++;
          const f = frameRef.current;
          ctx.fillStyle = '#0a0a18';
          ctx.fillRect(0, 0, W, H);

          const cx = W / 2, cy = H / 2;
          const maxR = 120;

          // Draw rings from outside in
          for (let i = 4; i >= 0; i--) {
            const r = maxR * ((i + 1) / 5);
            const isActive = activeRing === i;
            const pulseAmt = isActive ? 4 + Math.sin(f * 0.05) * 3 : 0;

            ctx.beginPath();
            ctx.arc(cx, cy, r + pulseAmt, 0, Math.PI * 2);
            ctx.fillStyle = ringColors[i] + (isActive ? "33" : "11");
            ctx.fill();
            ctx.strokeStyle = ringColors[i] + (isActive ? "aa" : "44");
            ctx.lineWidth = isActive ? 2 : 1;
            ctx.stroke();
          }

          // Animated ripple wave
          const waveR = ((f * 0.8) % (maxR + 40));
          if (activeRing === -1) {
            ctx.beginPath();
            ctx.arc(cx, cy, waveR, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,215,0,' + Math.max(0, 1 - waveR / (maxR + 40)) * 0.5 + ')';
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Center dot
          ctx.beginPath();
          ctx.arc(cx, cy, 5 + Math.sin(f * 0.04) * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffd700';
          ctx.fill();
          ctx.shadowBlur = 0;

          // Little figures at each ring
          for (let i = 0; i < 5; i++) {
            const ringR = maxR * ((i + 1) / 5) * 0.75;
            const count = i === 0 ? 1 : (i + 1) * 2;
            for (let j = 0; j < count; j++) {
              const angle = (j / count) * Math.PI * 2 + i * 0.5;
              const fx = cx + Math.cos(angle) * ringR;
              const fy = cy + Math.sin(angle) * ringR;
              ctx.fillStyle = ringColors[i] + (activeRing === i ? "cc" : "66");
              ctx.fillRect(fx - 2, fy - 4, 4, 6);
              ctx.fillRect(fx - 1, fy - 6, 2, 3);
            }
          }

          anim = requestAnimationFrame(render);
        }
        render();
        return () => cancelAnimationFrame(anim);
      }, [activeRing]);

      return (
        <div style={{ border: "2px solid #333366", background: "#0a0a18", padding: "24px", margin: "28px 0" }}>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: "#e67e22", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px", textAlign: "center" }}>The Cantillon Ripple</div>

          <canvas ref={canvasRef} width={570} height={280}
            style={{ width: "100%", height: "auto", display: "block", marginBottom: "16px" }} />

          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
            {ringLabels.map((label, i) => (
              <button key={i}
                onClick={() => setActiveRing(activeRing === i ? -1 : i)}
                style={{
                  background: activeRing === i ? ringColors[i] + "33" : "#12122a",
                  border: "1px solid " + (activeRing === i ? ringColors[i] : "#333366"),
                  color: activeRing === i ? ringColors[i] : "#888880",
                  fontFamily: "'VT323', monospace", fontSize: "13px", padding: "6px 12px", cursor: "pointer", transition: "all 0.2s"
                }}
              >{label}</button>
            ))}
          </div>

          {activeRing >= 0 && (
            <div style={{ padding: "12px", background: "#1a1520", border: "1px dashed " + ringColors[activeRing], fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic", transition: "all 0.3s" }}>
              {ringDescs[activeRing]}
            </div>
          )}

          {activeRing === -1 && (
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "12px", color: "#555560", textAlign: "center" }}>
              Click a ring to see where you might be standing.
            </div>
          )}
        </div>
      );
    }

    function InterventionQuadrantViz() {
      const [points, setPoints] = useState([]);
      const [hoveredQ, setHoveredQ] = useState(null);
      const boxSize = 280;
      const half = boxSize / 2;

      const addPoint = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * boxSize;
        const y = ((e.clientY - rect.top) / rect.height) * boxSize;
        const qx = x >= half ? "expected" : "unexpected";
        const qy = y <= half ? "success" : "failure";
        const label = qy === "success" && qx === "expected" ? "Fruition" : qy === "success" && qx === "unexpected" ? "Serendipity" : qy === "failure" && qx === "unexpected" ? "Mistake" : "Sabotage";
        setPoints(p => [...p, { x, y, label, id: Date.now() }]);
      };

      const quadrants = [
        { name: "Serendipity", sub: "Success, Unexpected", color: "#4a9aea", x: 0, y: 0 },
        { name: "Fruition", sub: "Success, Expected", color: "#4a9a4a", x: half, y: 0 },
        { name: "Mistake", sub: "Failure, Unexpected", color: "#e6a030", x: 0, y: half },
        { name: "Sabotage", sub: "Failure, Expected", color: "#aa3333", x: half, y: half }
      ];

      const counts = { Fruition: 0, Serendipity: 0, Mistake: 0, Sabotage: 0 };
      points.forEach(p => counts[p.label]++);
      const total = points.length;
      const topHalf = counts.Fruition + counts.Serendipity;
      const bottomHalf = counts.Mistake + counts.Sabotage;

      return (
        <div style={{ border: "2px solid #333366", background: "#0a0a18", padding: "24px", margin: "28px 0" }}>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: "#e67e22", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", textAlign: "center" }}>Feedback Quadrant</div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "12px", color: "#666680", textAlign: "center", marginBottom: "16px" }}>Click to plot your interventions. Where do they cluster?</div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
            <div onClick={addPoint} style={{ width: boxSize + "px", height: boxSize + "px", position: "relative", cursor: "crosshair", border: "1px solid #444466" }}>
              {quadrants.map((q, i) => (
                <div key={i}
                  onMouseEnter={() => setHoveredQ(q.name)}
                  onMouseLeave={() => setHoveredQ(null)}
                  style={{
                    position: "absolute", left: q.x, top: q.y, width: half, height: half,
                    background: q.color + (hoveredQ === q.name ? "33" : "15"),
                    borderRight: q.x === 0 ? "1px solid #444466" : "none",
                    borderBottom: q.y === 0 ? "1px solid #444466" : "none",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s"
                  }}>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: "14px", color: q.color, letterSpacing: "1px", opacity: 0.8 }}>{q.name}</div>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: "10px", color: q.color, opacity: 0.5 }}>{q.sub}</div>
                </div>
              ))}

              {/* Axis labels */}
              <div style={{ position: "absolute", top: "-18px", left: half - 20, fontFamily: "'VT323', monospace", fontSize: "12px", color: "#4a9a4a", letterSpacing: "1px" }}>SUCCESS</div>
              <div style={{ position: "absolute", bottom: "-18px", left: half - 16, fontFamily: "'VT323', monospace", fontSize: "12px", color: "#aa3333", letterSpacing: "1px" }}>FAILURE</div>
              <div style={{ position: "absolute", left: "-60px", top: half - 8, fontFamily: "'VT323', monospace", fontSize: "11px", color: "#e6a030", letterSpacing: "1px" }}>UNEXPECTED</div>
              <div style={{ position: "absolute", right: "-52px", top: half - 8, fontFamily: "'VT323', monospace", fontSize: "11px", color: "#4a9a4a", letterSpacing: "1px" }}>EXPECTED</div>

              {/* Diagonal line */}
              <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                <line x1="0" y1={boxSize} x2={boxSize} y2="0" stroke="#ffffff15" strokeWidth="1" strokeDasharray="4,4" />
              </svg>

              {/* Points */}
              {points.map(p => (
                <div key={p.id} style={{
                  position: "absolute", left: p.x - 4, top: p.y - 4, width: 8, height: 8, borderRadius: "50%",
                  background: quadrants.find(q => q.name === p.label)?.color || "#fff",
                  border: "1px solid rgba(255,255,255,0.5)", pointerEvents: "none",
                  boxShadow: "0 0 6px " + (quadrants.find(q => q.name === p.label)?.color || "#fff") + "66"
                }} />
              ))}
            </div>
          </div>

          {total > 0 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "12px" }}>
              {Object.entries(counts).filter(([,v]) => v > 0).map(([k,v]) => (
                <div key={k} style={{ fontFamily: "'VT323', monospace", fontSize: "14px", color: quadrants.find(q => q.name === k)?.color }}>
                  {k}: {v}
                </div>
              ))}
            </div>
          )}

          {total >= 3 && (
            <div style={{ padding: "12px", background: "#1a1520", border: "1px dashed " + (topHalf > bottomHalf ? "#4a9a4a" : bottomHalf > topHalf ? "#aa3333" : "#e67e22"), fontFamily: "'Courier Prime', monospace", fontSize: "13px", color: "#c0a060", textAlign: "center", fontStyle: "italic", marginBottom: "12px" }}>
              {topHalf > bottomHalf && counts.Serendipity > counts.Fruition && "Your results are clustering in Serendipity. You're working with good people and the system is rewarding you for listening to them."}
              {topHalf > bottomHalf && counts.Fruition >= counts.Serendipity && "Clustering in the top half. Your model of the system is sound and your interventions are landing where you expect them to."}
              {bottomHalf > topHalf && counts.Mistake > counts.Sabotage && "Clustering in Mistake. Your interventions are well-intentioned but your model of the system is incomplete. Slow down. Observe more. Talk to practitioners."}
              {bottomHalf > topHalf && counts.Sabotage >= counts.Mistake && "Clustering in Sabotage. You haven't gained the trust of the untrustworthy people in the system. They are feeding you incorrect information."}
              {topHalf === bottomHalf && "Evenly split. You're learning. Keep plotting. The pattern will emerge."}
            </div>
          )}

          {total > 0 && (
            <div style={{ textAlign: "center" }}>
              <button onClick={() => setPoints([])} style={{ background: "none", border: "1px solid #333366", color: "#666680", fontFamily: "'VT323', monospace", fontSize: "13px", padding: "4px 16px", cursor: "pointer" }}>Clear</button>
            </div>
          )}
        </div>
      );
    }

    const ARTICLE_VIZ_MODULES = {
      "pizza-slider": () => <PizzaSliderViz />,
      "oven-sim": () => <OvenSimViz />,
      "hegemonica-system": () => <HegemmonicaSystemViz />,
      "compound-sim": () => <CompoundSimViz />,
      "ripple-sim": () => <RippleSimViz />,
      "intervention-quadrant": () => <InterventionQuadrantViz />
    };

window.ARTICLE_VIZ_MODULES = ARTICLE_VIZ_MODULES;
